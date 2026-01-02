# HomeControl : WLED

Modern Angular app based on the WLED framework (HTTP/UDP/mDNS APIs) to discover and control WLED (WiFi LED) devices on the local network.

## Current Features

- **Color Control** — Set RGB colors per device or apply a color to all devices.
- **Power Management** — Toggle power per device or for all devices at once.
- **Device Management** — Add/remove devices by IP with IPv4 validation.
- **WLED framework integration** — uses WLED HTTP and discovery APIs (mDNS/UDP) for device communication and discovery.

## Quick Start

### Prerequisites
- Node.js v22.20.0 or higher
- npm

### Installation & Run
```bash
npm install
npm start
```
Open http://localhost:4200/ in your browser.

## How to Use

- Click **+ Add Device** and enter an IP (and optional name).
- Use each device card to toggle power or change color.
- Use universal controls to affect all devices at once.

## Project Structure (high level)

See the `src/app` folder for components, services, types, and validators. Key files:
- `src/app/components/wled-controller/wled-controller.ts` — main UI
- `src/app/components/device-card/device-card.ts` — per-device controls
- `src/app/services/wled-http-service.ts` — HTTP layer for WLED devices

## API

Communicates with the WLED JSON API:

```
GET  http://<device-ip>/json         # get device state
POST http://<device-ip>/json/state  # set device state
```

## Roadmap — Planned Features & Next Work

Prioritized items for upcoming days:

1. Device grouping / zones — group multiple devices into logical zones for simultaneous control.
2. Brightness & per-segment control — fine-grained brightness and segment selection.
3. Effect selection & presets — expose WLED effects and user-defined scenes.
4. Real-time polling & state sync — keep UI in sync with devices (optional WebSocket support).
5. Network scanning & auto-detection — implement mDNS/UDP and active network scanning to automatically discover WLED devices on the local network and populate the device list.
6. Persistence & offline UX — move from sessionStorage to LocalStorage and improve offline handling.
7. UI polish — dark mode, accessibility improvements, mobile layout refinements.


## Troubleshooting

- Devices not reachable: ensure devices are on the same network and IPs are correct.
- Validation: use the Add Device dialog — IPv4 validator prevents invalid addresses.

