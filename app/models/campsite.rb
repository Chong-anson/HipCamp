# == Schema Information
#
# Table name: campsites
#
#  id            :bigint           not null, primary key
#  name          :string           not null
#  capacity      :integer          not null
#  price         :integer          not null
#  venue_id      :integer          not null
#  campsite_type :string           not null
#  lat           :float            not null
#  lng           :float            not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Campsite < ApplicationRecord
    validates :name, presence: true, uniqueness: true
    validates :price, :venue_id, :campsite_type, :lat, :lng, presence: true
    validates :campsite_type, inclusion: {in: ["CAMPING", "RV", "GLAMPING"]}

    belongs_to :venue,
        class_name: :Venue

    has_many :bookings
end