# frozen_string_literal: true

require 'rsi_roadmap_loader'

class RoadmapWorker
  include Sidekiq::Worker
  sidekiq_options retry: false, queue: (ENV['ROADMAP_LOADER_QUEUE'] || 'fleetyards_roadmap_loader').to_sym

  def perform
    RsiRoadmapLoader.new.fetch

    changes = Audit.includes(:roadmap_items).where(
      roadmap_items: { rsi_category_id: RoadmapItem::MODELS_CATEGORY },
      created_at: (Time.zone.now - 1.day)..Time.zone.now
    ).count

    return if changes.zero?

    RoadmapMailer.notify_admin(changes).deliver_later

    ActionCable.server.broadcast('roadmap', {
      changes: changes
    }.to_json)
  end
end
