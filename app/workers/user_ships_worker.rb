# frozen_string_literal: true

class UserShipsWorker
  include Sidekiq::Worker
  sidekiq_options retry: true, queue: (ENV['USER_SHIPS_QUEUE'] || 'fleetyards_user_ships_loader').to_sym

  def perform(ship_id)
    UserShip.where(ship_id: ship_id, sale_notify: true).find_each do |user_ship|
      next unless user_ship.user.sale_notify?

      UserShipMailer.on_sale(user_ship).deliver_later
    end
  end
end
