# encoding: utf-8
# frozen_string_literal: true

json.array! @user_ships, partial: 'api/v1/hangars/show', as: :user_ship
