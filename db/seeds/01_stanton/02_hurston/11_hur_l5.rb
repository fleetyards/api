# frozen_string_literal: true

hurston = CelestialObject.find_or_create_by!(name: 'Hurston')

hidden = false

hur_l5 = Station.find_or_initialize_by(name: 'Rest & Relax (HUR-L5)')
hur_l5.update!(celestial_object: hurston, station_type: :rest_stop, location: 'HUR-L5', store_image: Rails.root.join('db/seeds/images/stanton/hurston/hur-l5/hur-l5-a.jpg').open, hidden: hidden)

hur_l5.docks.destroy_all
{ small: [1, 3], large: [2, 4] }.each do |ship_size, pads|
  pads.each do |pad|
    hur_l5.docks << Dock.new(
      name: ("%02d" % pad),
      dock_type: :landingpad,
      ship_size: ship_size,
    )
  end
end
{ large: [1, 2] }.each do |ship_size, hangars|
  hangars.each do |hangar|
    hur_l5.docks << Dock.new(
      name: ("%02d" % hangar),
      dock_type: :hangar,
      ship_size: ship_size,
    )
  end
end

hur_l5.habitations.destroy_all
%w[1 2 3 4 5].each do |level|
  pad = 1
  { container: 10 }.each do |hab_size, count|
    count.times do
      hur_l5.habitations << Habitation.new(
        name: "Level #{"%02d" % level} Hab #{"%02d" % pad}",
        habitation_name: 'EZ Hab',
        habitation_type: hab_size
      )
      pad += 1
    end
  end
end

admin_office = Shop.find_or_initialize_by(name: 'Admin Office', station: hur_l5)
admin_office.update!(shop_type: :admin, store_image: Rails.root.join('db/seeds/images/stanton/hurston/hur-l5/admin.jpg').open, hidden: hidden)
live_fire_weapons = Shop.find_or_initialize_by(name: 'Livefire Weapons', station: hur_l5)
live_fire_weapons.update!(shop_type: :weapons, store_image: Rails.root.join('db/seeds/images/stanton/hurston/hur-l5/weapons.jpg').open, hidden: hidden)
casaba = Shop.find_or_initialize_by(name: 'Casaba Outlet', station: hur_l5)
casaba.update!(shop_type: :clothing, store_image: Rails.root.join('db/seeds/images/stanton/hurston/hur-l5/casaba.jpg').open, hidden: hidden)
platinum_bay = Shop.find_or_initialize_by(name: 'Platinum Bay', station: hur_l5)
platinum_bay.update!(shop_type: :components, store_image: Rails.root.join('db/seeds/images/stanton/hurston/hur-l5/platinum.jpg').open, hidden: hidden)

congreve_weapons = Shop.find_or_initialize_by(name: 'Congreve Weapons', station: hur_l5)
congreve_weapons.update!(
  shop_type: :weapons,
  # store_image: Rails.root.join('db/seeds/images/stanton/hurston/hur-l5/ship_weapons.jpg').open,
  hidden: hidden
)
