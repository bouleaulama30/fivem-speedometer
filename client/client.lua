local unit = Config.DefaultUnit;

AddEventHandler('onResourceStart', function(resourceName)
  if (GetCurrentResourceName() ~= resourceName) then
    return
  end
end)

RegisterNUICallback("switchUnit", function(_, cb)
    SendNUIMessage({
        action = "updateUnit",
        unit = unit,
    })
    cb("ok")
end)



Citizen.CreateThread(function ()
    while true do
        local ped = PlayerPedId();

        
        if IsPedInAnyVehicle(ped, false) then
            local vehicleID = GetVehiclePedIsIn(ped, false)

            if GetIsVehicleEngineRunning(vehicleID) then
                local speed = GetEntitySpeed(vehicleID)
                local gear = GetVehicleCurrentGear(vehicleID)
                local rpm = GetVehicleCurrentRpm(vehicleID)

                
                -- data conversion from config
                if unit == 'KM/H' then
                    speed = math.floor((speed * 3.6) + 0.5)
                elseif unit == 'MPH' then
                    speed = math.floor((speed * 2.236936) + 0.5)
                else
                    speed = -1
                end

                if rpm <= 0.21 and gear == 0 and speed == 0 then
                    gear = -1
                end

                SendNUIMessage({
                    action = "updateSpeedometer",
                    speed = speed,
                    gear = gear,
                    rpm = rpm,
                })
            else 
                SendNUIMessage({
                    action = "hideSpeedometer",
                })
            end
        end
        
        Citizen.Wait(50)
    end
end)
