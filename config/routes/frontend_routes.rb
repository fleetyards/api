# frozen_string_literal: true

namespace :frontend, path: '', constraints: { subdomain: 'www' } do
  get 'ships' => 'base#index'
  get 'ships/:slug' => 'base#model'

  get 'fleets' => 'base#index'
  get 'fleets/:sid' => 'base#fleet'

  get 'hangar' => 'base#index'
  get 'hangar/:username' => 'base#hangar'

  get 'compare/ships' => 'base#index'

  get 'cargo' => 'base#index'

  get 'commodities' => 'base#index'
  get 'commodities/:id' => 'base#commodities'

  get 'images' => 'base#index'

  get 'impressum' => 'base#index'
  get 'privacy-policy' => 'base#index'

  get 'sign-up' => 'base#index'
  get 'login' => 'base#index'

  get 'settings' => 'base#index'
  get 'settings/profile' => 'base#index'
  get 'settings/account' => 'base#index'
  get 'settings/change-password' => 'base#index'

  get 'password/request' => 'base#index'
  get 'password/update/:token' => 'base#password'
  get 'confirm/:token' => 'base#confirm'

  get 'embed' => 'base#embed'

  match '404' => 'base#not_found', via: :all

  root to: 'base#index'
end
