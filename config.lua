Config = {}

Config.DefaultUnit = 'KM/H'

Config.hideSpeedometer = false

Config.SettingsPanel = 'hud'

-- Fuel System
Config.EnableFuel = true

Config.FuelSystem = 'sdff' -- Options: LegacyFuel / ox-fuel

Config.GetVehicleFuelAmount = function(vehicle)
    if Config.EnableFuel then
        if DoesEntityExist(vehicle) then
            if Config.FuelSystem == 'LegacyFuel' then
                return exports["LegacyFuel"]:GetFuel(vehicle)
            elseif Config.FuelSystem == 'ox-fuel' then
                return GetVehicleFuelLevel(vehicle)
            else
                -- You can add other fuel systems here if needed
                return 25 -- Default to full if unknown system
            end
        end
    else
        -- Fallback to the default game fuel level if fuel system is disabled
        return GetVehicleFuelLevel(vehicle)
    end
end