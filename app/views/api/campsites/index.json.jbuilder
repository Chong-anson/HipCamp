json.campsites do
    @campsites.each do | campsite | 
        json.set! campsite.id do
            json.partial! "/api/campsites/campsite", campsite: campsite
        end
    end
end

json.tags do 
    @campsites.each do | campsite | 
        json.
    end
end
