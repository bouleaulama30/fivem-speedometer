Config = {}

-- Set the default speed unit displayed on the speedometer
Config.DefaultUnit = 'KM/H' -- Options: 'KM/H' or 'MPH'

-- Hide the speedometer on HUD (true = hidden, false = visible)
Config.hideSpeedometer = false -- false to show the speedometer on the HUD

-- Set which command to use to open the settings panel for the speedometer
Config.SettingsPanel = 'settings'

-- ============================================
-- Fuel System Configuration
-- ============================================

-- Enable fuel system integration (true = enabled, false = disabled)
Config.EnableFuel = true

-- Select which fuel system to use for retrieving vehicle fuel level
Config.FuelSystem = 'sdff' -- Options: LegacyFuel / ox-fuel

-- Function to retrieve the current fuel amount from a vehicle
-- Parameter: vehicle - the vehicle entity ID
-- Returns: fuel amount (0-100) or nil if invalid
Config.GetVehicleFuelAmount = function(vehicle)
    if Config.EnableFuel then
        if DoesEntityExist(vehicle) then
            if Config.FuelSystem == 'LegacyFuel' then
                return exports["LegacyFuel"]:GetFuel(vehicle)
            elseif Config.FuelSystem == 'ox-fuel' then
                return GetVehicleFuelLevel(vehicle)
            else
                -- Fallback: add other fuel systems here if needed
                return 25 -- Default to 25% if unknown system
            end
        end
    else
        -- Fallback to the default GTA game fuel level if fuel system is disabled
        return GetVehicleFuelLevel(vehicle)
    end
end