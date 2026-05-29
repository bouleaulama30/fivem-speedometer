# Simple BL30 Speedometer

The **Simple BL30 Speedometer** is a open source light, and simple speedometer resource that provides players with real-time vehicle telemetry. Designed with a modern digital aesthetic, it’s perfect for racing servers, immersive roleplay communities, and any server looking to upgrade its driving interface.

✨ With dynamic visual informations, built-in fuel integration, an in-game settings panel, and  customization, this script enhances both gameplay and the driving experience for any player.

***

### What Does This Script Do?

* 📊 **Real-Time Vehicle Telemetry**\
  Displays accurate vehicle speed, current gear, RPM, and fuel levels in a beautiful, easy-to-read digital interface.
* 🎨 **Dynamic Visual Indicators**\
  RPM and Fuel progress bars automatically change color (Green ➔ Yellow ➔ Red) depending on the vehicle's state to visually alert the driver when redlining or running low on gas.
* ⚙️ **In-Game Settings Panel**\
  Enable players to personalize their experience by accessing a dedicated **Settings** menu (via command) to instantly switch between KM/H and MPH, or hide the speedometer entirely.
* ⛽ **Fuel System Integration**\
  Out-of-the-box compatibility with popular fuel scripts like *LegacyFuel* and *ox-fuel*. Fallbacks to the native GTA V fuel system if disabled.
* ⚡ **Highly Optimized Performance**\
  Resource-friendly code that only updates and displays the UI when the player is inside a vehicle and the engine is actively running.
* 🛠️ **Fully Configurable**\
  Default units, settings command, and fuel system selection — is editable to fit your exact server environment.

***

### Standalone & Flexible

* ✅ Works as a standalone script.
* 🔄 Fully open-source get the code and adaptable to any framework (ESX, QB-Core, vRP) allowing you to freely modify the code for your community.
* :shopping\_bags: See my other scripts in my [store](https://bouleaulama30.tebex.io/)

# Installation and Dependencies

### Installation

#### 1. Get the script

Clone or download the github repository
***

#### 2. Add the script to server ressources

Move the downloaded folder into your server ressources, rename it **fivem-speedometer** if it has a different name&#x20;

***

#### 3. Update your  `server.cfg`

Add **`ensure fivem-speedometer`  in your&#x20;**<kbd>**server.cfg**</kbd>**&#x20; file to start the script with your server**

### Dependencies

There are no dependencies to make the script work. Moreover this script is compatible with **Legacy Fuel** and **Ox fuel**.


# General Configuration

This guide will help you customize the Simple Speedometer standalone script to fit your server's needs, by explaining all available options in the `config.lua` file.

### **1. General Configuration**

#### Default Unit

Set the default speed unit displayed on the speedometer, you can choose between 'KM/H' or 'MPH'

```lua
Config.DefaultUnit = 'KM/H' -- Options: 'KM/H' or 'MPH'
```

#### Hidden Speedometer

Hide the speedometer on HUD (true = hidden, false = visible)

```lua
Config.hideSpeedometer = false -- false to show the speedometer on the HUD
```

### 2. Command Usage

Set which command to use to open the settings panel for the speedometer

```lua
Config.SettingsPanel = 'settings'
```

### 3. Fuel System Configuration

Enable fuel system integration
```lua
Config.EnableFuel = true -- (true = enabled, false = disabled)
```

Select which fuel system to use for retrieving vehicle fuel level
```lua
Config.FuelSystem = 'ox-fuel' -- Options: LegacyFuel / ox-fuel
```

Function to retrieve the current fuel amount from a vehicle, you can add other fuel systems here if needed
```lua
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
```

