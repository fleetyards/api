# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)

    can :manage, :all if user.admin?

    can :read, [:manufacturers, Manufacturer]
    can :read, [:models, Model]
    can :read, [:components, Component]

    can :check, :users

    can :show, :api
    can :read, :api_stats
    can %i[index show], :api_models
    can %i[index], :api_manufacturers
    can %i[index show], :api_stations
    can %i[show index], :api_celestial_objects
    can %i[index show], :api_shops
    can %i[index], :api_shop_commodities
    can %i[show index], :api_starsystems
    can %i[index], :api_images
    can %i[index], :api_commodities
    can %i[index], :api_components
    can %i[index], :api_equipment
    can %i[index sort], :api_hangar_groups
    can %i[show create], :api_commodity_prices
    can %i[show], :api_components
    can %i[index], :api_roadmap
    can %i[index], :api_search
    can %i[index], :api_trade_routes
    can :read, :api_fleet

    can %i[read_public], :user

    return if user.id.blank?

    can :index, :api_hangar
    can :accept, FleetMembership, user_id: user.id
    can :create, Fleet
    can :show, Fleet, fleet_memberships: { user_id: user.id }
    can %i[update destroy], Fleet, fleet_memberships: { user_id: user.id, role: :admin }
    can %i[create update destroy], Vehicle, user_id: user.id
    can %i[create update destroy], HangarGroup, user_id: user.id
    can %i[read update destroy], User, id: user.id
  end
end
