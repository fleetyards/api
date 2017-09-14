# encoding: utf-8
# frozen_string_literal: true

module Api
  module V1
    class ShipsController < ::Api::V1::BaseController
      before_action :authenticate_api_user!, only: []
      after_action only: [:index] { pagination_header(:ships) }
      after_action only: [:gallery] { pagination_header(:images) }

      rescue_from ActiveRecord::RecordNotFound do |_exception|
        not_found(I18n.t('messages.record_not_found.ship', slug: params[:slug]))
      end

      def index
        authorize! :index, :api_ships
        @q = Ship.enabled
                 .ransack(query_params)
        @ships = @q.result
                   .order("ships.name asc")
                   .page(params[:page])
                   .per(per_page)
      end

      def filters
        authorize! :index, :api_ships
        @filters ||= begin
          filters = []
          filters << ShipRole.ship_filters
          filters << Manufacturer.ship_filters
          filters << Ship.production_status_filters
          filters << Ship.on_sale_filters
          filters << Ship.classification_filters
          filters.flatten
                 .sort_by { |filter| [filter.category, filter.name] }
        end
      end

      def latest
        authorize! :index, :api_ships
        @ships = Ship.enabled
                     .order(updated_at: :desc)
                     .limit(10)
      end

      def updated
        authorize! :index, :api_ships
        if updated_range.present?
          scope = Ship.enabled
          scope = scope.where(updated_at: updated_range)
          @ships = scope.order(updated_at: :desc)
        else
          render json: [], status: :not_modified
        end
      end

      def show
        authorize! :show, :api_ships
        @ship = Ship.enabled
                    .find_by!(slug: params[:slug])
      end

      def gallery
        authorize! :index, :api_ships
        ship = Ship.find_by!(slug: params[:slug])
        @images = ship.images
                      .enabled
                      .order(created_at: :asc)
                      .page(params[:page])
                      .per(per_page)
      end

      private def updated_range
        return if updated_params[:from].blank?
        to = updated_params[:to] || Time.zone.now
        [updated_params[:from]...to]
      end

      private def updated_params
        @updated_params ||= params.permit(
          :from, :to
        )
      end
    end
  end
end
