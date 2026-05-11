local unit = Config.DefaultUnit;
local hideSpeedometerBool = Config.hideSpeedometer
print("Default unit: " .. unit)
AddEventHandler('onResourceStart', function(resourceName)
  if (GetCurrentResourceName() ~= resourceName) then
    return
  end

end)

RegisterCommand(Config.SettingsPanel, function()
    print("Activate control panel")
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "openSettings",
        unit = unit
    })
end, false)

RegisterNUICallback("switchUnit", function(data, cb)
    unit = data.unit
    SendNUIMessage({
        action = "updateUnit",
        unit = unit,
    })
    cb("ok")
end)

RegisterNUICallback("getInitConf", function(_, cb)
    SendNUIMessage({
        action = "startInitConf",
        unit = unit,
        hideSpeedometerBool = hideSpeedometerBool,
    })
    cb("ok")
end)


RegisterCommand(Config.SettingsPanel, function()
    print("Activate control panel")
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "openSettings",
        unit = unit
    })
end, false)


RegisterNUICallback("closeSettings", function(_, cb)
    SetNuiFocus(false, false)
    cb("ok")
end)

RegisterNUICallback("hideSpeedometer", function(data, cb)
    hideSpeedometerBool = data.hideSpeedometerBool
    print(hideSpeedometerBool)
    cb("ok")
end)


Citizen.CreateThread(function ()
    while true do
        local ped = PlayerPedId();

        if IsPedInAnyVehicle(ped, false) then
            local vehicleID = GetVehiclePedIsIn(ped, false)

            SetVehicleNumberPlateText(vehicleID, "TAREK")

            if GetIsVehicleEngineRunning(vehicleID) then
                local speed = GetEntitySpeed(vehicleID)
                local gear = GetVehicleCurrentGear(vehicleID)
                local rpm = GetVehicleCurrentRpm(vehicleID)
                local fuel = Config.GetVehicleFuelAmount(vehicleID)
                
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
                    hideSpeedometerBool = hideSpeedometerBool,
                    fuel = fuel,
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
