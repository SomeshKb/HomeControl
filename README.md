# WLED Controller

A modern Angular application for controlling WLED (WiFi LED) devices on your network with a beautiful Material Design interface.

## Features

- ✨ **Material Design UI** - Modern, professional interface
- 🎨 **Color Control** - Set colors on individual or all devices
- 💡 **Power Management** - Turn devices on/off individually or in bulk
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🔐 **Form Validation** - IPv4 validation for device IP addresses
- 🎯 **Component-Based** - Clean, modular architecture
- ⚡ **Reactive Forms** - Robust form handling with validation

## Quick Start

### Prerequisites
- Node.js v22.20.0 or higher
- npm (comes with Node.js)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:4200/`

## Usage

### Adding a WLED Device

1. Click the **"+ Add Device"** button in the top right
2. Enter the device name (optional) and IP address (required)
3. Click **"Add Device"**
4. The device will appear in the "Connected Devices" section

### Controlling Devices

**Individual Device:**
- Toggle power with the power button
- Change color with the color picker
- Open advanced options (for future implementation)

**All Devices (Universal Control):**
- Use "Power On All" / "Power Off All" buttons
- Use the color picker to set all devices to the same color

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── add-device-dialog/        # Device addition modal
│   │   ├── device-card/              # Individual device card
│   │   ├── wled-controller/          # Main controller
│   │   └── wled-device-details/      # (future)
│   ├── services/
│   │   └── wled-http-service.ts      # HTTP communication
│   ├── types/
│   │   └── wled-device.ts            # TypeScript interfaces
│   └── validators/
│       └── ipv4.validator.ts         # IPv4 validation
├── styles.scss                        # Global styles
└── index.html                         # Main HTML
```

## Architecture

### Components

- **WledController**: Main component orchestrating the app
- **AddDeviceDialogComponent**: Modal for adding new devices
- **DeviceCardComponent**: Reusable card for displaying device info and controls

### Services

- **WledHttpService**: Handles all HTTP communication with WLED devices
- Uses session storage to persist device list

### Validation

- **IPv4Validator**: Custom validator for IP address field

## API Integration

The app communicates with WLED devices using their HTTP JSON API:

```
GET http://<device-ip>/json         # Get device state and info
POST http://<device-ip>/json/state  # Set device state
```

### Example Requests

**Turn device on:**
```bash
POST http://192.168.1.50/json/state
{"on": true}
```

**Set color (RGB):**
```bash
POST http://192.168.1.50/json/state
{"seg": [{"col": [[255, 0, 0]]}]}
```

## Technologies Used

- **Angular 20** - Frontend framework
- **Angular Material** - UI components
- **RxJS** - Reactive programming
- **TypeScript** - Type-safe development
- **SCSS** - Styling
- **Reactive Forms** - Form handling

## Development

### Code Scaffolding

Generate a new component:
```bash
ng generate component components/component-name
```

### Running Tests

Execute unit tests:
```bash
npm test
```

## Building for Production

Build optimized production artifacts:
```bash
npm run build
```

Artifacts will be in the `dist/` directory.

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Responsive design for all screen sizes

## Configuration Files

- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript configuration
- `tsconfig.app.json` - App-specific TypeScript config
- `tsconfig.spec.json` - Test-specific TypeScript config

## Documentation

- [INSTALLATION.md](./INSTALLATION.md) - Detailed setup and usage guide
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Technical implementation details
- [UI_DESIGN_REFERENCE.md](./UI_DESIGN_REFERENCE.md) - UI layout and design guidelines

## Troubleshooting

### Devices won't connect
- Verify WLED devices are on the same network
- Check IP addresses are correct and accessible
- Ensure WLED firmware is up to date

### Material icons not showing
- Material icon fonts are loaded from Google Fonts (internet required)
- Check network connectivity

### Form validation not working
- Ensure Angular forms module is properly imported
- Check browser console for errors

## Future Enhancements

- [ ] Device grouping/zones
- [ ] Brightness control
- [ ] Effect selection
- [ ] Scene/preset management
- [ ] Real-time status polling
- [ ] Device discovery
- [ ] LocalStorage persistence
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Advanced device settings panel

## License

This project is provided as-is for personal use.

## Support

For issues or questions, please refer to the documentation files or check the WLED project documentation at [wled.me](https://wled.me)

---

**Status**: ✅ Latest version with Material Design UI (Angular 20)

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
