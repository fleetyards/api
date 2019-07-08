# frozen_string_literal: true

hurston = CelestialObject.find_or_create_by!(name: 'Hurston')

hidden = false

hur_l2 = Station.find_or_initialize_by(name: 'Rest & Relax (HUR-L2)')
hur_l2.update!(
  celestial_object: hurston,
  station_type: :rest_stop,
  location: 'HUR-L2',
  store_image: Rails.root.join('db/seeds/images/stanton/hurston/hur-l2/hur-l2.jpg').open,
  hidden: hidden
)

hur_l2.docks.destroy_all
pad = 1
{ small: 3, medium: 1 }.each do |ship_size, count|
  count.times do |index|
    hur_l2.docks << Dock.new(
      name: "Ladingpad #{"%02d" % pad}",
      dock_type: :landingpad,
      ship_size: ship_size,
    )
    pad += 1
  end
end
pad = 1
{ large: 2 }.each do |ship_size, count|
  count.times do |index|
    hur_l2.docks << Dock.new(
      name: "Hangar #{"%02d" % pad}",
      dock_type: :hangar,
      ship_size: ship_size,
    )
    pad += 1
  end
end

admin_office = Shop.find_or_initialize_by(name: 'Admin Office', station: hur_l2)
admin_office.update!(
  shop_type: :admin,
  store_image: Rails.root.join('db/seeds/images/stanton/hurston/hur-l2/admin.jpg').open,
  hidden: hidden
)

live_fire_weapons = Shop.find_or_initialize_by(name: 'Livefire Weapons', station: hur_l2)
live_fire_weapons.update!(
  shop_type: :weapons,
  store_image: Rails.root.join('db/seeds/images/stanton/hurston/hur-l2/weapons.jpg').open,
  hidden: hidden
)

casaba = Shop.find_or_initialize_by(name: 'Casaba Outlet', station: hur_l2)
casaba.update!(
  shop_type: :clothing,
  store_image: Rails.root.join('db/seeds/images/stanton/hurston/hur-l2/casaba.jpg').open,
  hidden: hidden
)

platinum_bay = Shop.find_or_initialize_by(name: 'Platinum Bay', station: hur_l2)
platinum_bay.update!(
  shop_type: :components,
  store_image: Rails.root.join('db/seeds/images/stanton/hurston/hur-l2/platinum.jpg').open,
  hidden: hidden
)
