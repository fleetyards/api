# frozen_string_literal: true

module Api
  module V1
    class ShopCommoditiesController < ::Api::V1::BaseController
      before_action :authenticate_api_user!, only: []
      after_action -> { pagination_header(:shop_commodities) }, only: [:index]

      def index
        authorize! :index, :api_shop_commodities
        sorts = [
          'commodity_item_of_Model_type_name asc',
          'commodity_item_of_Component_type_name asc',
          'commodity_item_of_Commodity_type_name asc',
          'commodity_item_of_Equipment_type_name asc'
        ]
        shop_commodities_query_params['sorts'] = sort_by_name(sorts, sorts)

        @q = shop.shop_commodities
                 .ransack(shop_commodities_query_params)

        @shop_commodities = @q.result
                              .page(params[:page])
                              .per(per_page(ShopCommodity))
      end

      def sub_categories
        authorize! :index, :api_shop_commodities

        @filters ||= begin
          filters = []
          filters << Model.classification_filters
          filters << Equipment.type_filters
          filters << Component.class_filters
          filters.flatten
                 .sort_by { |category| [category.category, category.name] }
        end
      end

      private def shop
        @shop ||= station.shops.visible.find_by!(slug: params[:shop_slug])
      end

      private def station
        @station ||= Station.visible.find_by!(slug: params[:station_slug])
      end

      private def shop_commodities_query_params
        @shop_commodities_query_params ||= query_params(
          :name_cont, :price_gteq, :price_lteq,
          category_in: [], sub_category_in: [], manufacturer_slug_in: []
        )
      end
    end
  end
end
