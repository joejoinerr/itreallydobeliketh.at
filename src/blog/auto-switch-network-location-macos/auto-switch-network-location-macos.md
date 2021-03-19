---
title: Automatically switch network locations on macOS using Keyboard Maestro
date: 2020-08-07
description: Easily switch macOS locations by watching the network SSID with Keyboard Maestro, rather than using the Apple menu.
tags: 
    - automation
---

I have a [Pi-hole](https://pi-hole.net/) running on my home network, against static IPs rather than over DHCP, so that I can recognise devices from the logs. This means having the DNS set up on each device as this isn't provided automatically by the DHCP configuration.

To simplify setup for this on my MacBook, I created an additional [network location](https://support.apple.com/en-gb/HT202480) for my home address. This means that I can switch between the Pi-hole network configuration and the DHCP configuration profiles without the need to amend any fields.

You can then switch locations from the Apple menu:

![Screenshot of the Apple menu on a MacBook Pro, showing the items available under the 'Locations' menu.](/img/2020-08-07-locations-apple-menu.png)


## Going further

While this is useful, I was looking for an easier way to manage this. Along with the Apple menu, I found that there is a built-in utility for switching locations using the Terminal:

```bash
$ scselect "location name"
```

There's also a `-n` flag, outlined on the [scselect man page](https://ss64.com/osx/scselect.html), which will trigger the switch on the next system restart.

While this is very useful, it's still a manual process to open the Terminal, type that out and finish the switch; arguably more manual than simply using the Apple menu. 

Since you can use shell scripts as workflows in one of my favourite Mac apps, [Alfred](https://www.alfredapp.com/), I looked around and found [alfred-network-location by @deanishe](https://github.com/deanishe/alfred-network-location) that would let me switch locations using a more accessible interface:

![Screenshot of Alfred for macOS running the alfred-network-location workflow.](/img/2020-08-07-alfred-network-location.png)

Again, this is great, but still relies on manually changing the location.


## Automating locations with Keyboard Maestro

Keyboard Maestro also allows running shell scripts, but actually has the location-switching capability built in. Since I only ever wanted this location to be set when I'm using my home network, I can use the network SSID as the trigger for changing location:

![Screenshot of Keyboard Maestro showing a profile to switch between network locations](/img/2020-08-07-km-location-switcher.png)

This should be a fairly clear script to understand from the screenshot alone, but for clarity: if I'm connected to my home network, use the 'Home' location (with static IP and custom DNS set up), otherwise use the 'Automatic' location (IP set by DHCP and default DNS).

So now, when I'm on my MacBook at home, the location automatically switches to use the Pi-hole with my static IP. When I'm using another network, it grabs the connection details over DHCP. Perfect!