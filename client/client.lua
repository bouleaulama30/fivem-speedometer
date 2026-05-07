
Citizen.CreateThread(function ()
    while true do

        local ped = PlayerPedId();
        
        if IsPedInAnyVehicle(ped, false) then
            local vehicleID = GetVehiclePedIsIn(ped, false)
            local speed = GetEntitySpeed(vehicleID)
            local gear = GetVehicleCurrentGear(vehicleID)
            local rpm = GetVehicleCurrentRpm(vehicleID)


            -- data conversion
            if Config.DefaultUnit == 'KM/H' then
                speed = math.floor((speed * 3.6) + 0.5)
            else
                speed = math.floor((speed * 2.236936) + 0.5)
            end

            SendNUIMessage({
                action = "updateSpeedometer",
                speed = speed,
                gear = gear,
                rpm = rpm,
            })
        end
        Citizen.Wait(50)
    end
end)
