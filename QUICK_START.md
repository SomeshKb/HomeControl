# WLED Controller - Quick Start Guide

Get your WLED Controller application running in 5 minutes!

## 📋 Prerequisites

- Node.js v22.20.0+ ([download](https://nodejs.org/))
- npm (comes with Node.js)
- WLED device(s) on your network

## 🚀 Installation (2 minutes)

### Step 1: Install Dependencies
```bash
cd d:\Project\HomeControl
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

The app will open automatically at `http://localhost:4200/`

## 🎯 First Use (3 minutes)

### Adding Your First Device

1. Click the **"+ Add Device"** button (top right)
2. In the dialog:
   - **Device Name**: Enter a name (e.g., "Living Room") - optional
   - **WLED IP Address**: Enter your device's IP (e.g., 192.168.1.50) - required
3. Click **"Add Device"**

### Finding Your WLED Device IP

**Method 1: Router Admin Panel**
- Open router settings (usually 192.168.1.1 or 192.168.0.1)
- Look for connected devices
- Find your WLED device name

**Method 2: Serial Monitor**
- Connect to WLED via USB
- Open Serial Monitor (9600 baud)
- Look for "IP address:" message

**Method 3: Network Scanner**
- Use a network scanner app
- Look for device responding to port 80

## 💡 Basic Operations

### Control Individual Device

**Power Toggle**
- Click the power button on device card
- Orange = ON, Gray = OFF

**Change Color**
- Click the color box or file input
- Select color from picker
- Color updates on device

**Advanced Options**
- Click "⚙ Advanced Options" button
- (Future feature for effects, brightness, etc.)

### Control All Devices

**Power All**
- "Power On All" - Turn all devices on
- "Power Off All" - Turn all devices off

**Color All**
- Set color at top of page
- Applies to all connected devices

## 🔧 Troubleshooting

### Device Won't Connect

**Problem**: "Device at IP XXX is not reachable"

**Solutions**:
1. Verify IP address is correct
2. Ping device from command line:
   ```bash
   ping 192.168.1.50
   ```
3. Check WLED is running (look for WiFi LED pattern)
4. Ensure device is on same network as computer
5. Restart WLED device

### Dialog Won't Open

**Problem**: Click Add Device button, nothing happens

**Solutions**:
1. Check browser console for errors (F12 → Console)
2. Refresh page (Ctrl+R)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Restart development server (Ctrl+C, then `npm start`)

### IP Validation Error

**Problem**: "Please enter a valid IPv4 address"

**Format Required**: `###.###.###.###` where each `#` is 0-255

**Valid Examples**:
- 192.168.1.50
- 10.0.0.1
- 172.16.0.1

**Invalid Examples**:
- 192.168.1 (incomplete)
- 256.1.1.1 (256 out of range)
- abc.def.ghi.jkl (not numbers)

### Colors Not Changing

**Problem**: Click color picker, color doesn't update on device

**Solutions**:
1. Verify device IP is correct
2. Check device responds to ping
3. Restart WLED device
4. Try power toggle first (to wake device)
5. Check browser console for network errors

## 📱 Mobile Usage

The app works on tablets and phones:

1. Ensure device is on same network as phone
2. Use phone's browser to navigate to development server
   - Find your computer IP (e.g., 192.168.1.100)
   - Navigate to `http://192.168.1.100:4200`
3. App will adapt to mobile screen size

## 🔌 Network Setup

### Recommended Setup

```
Internet
    ↓
WiFi Router
    ├─ Your Computer (running this app)
    ├─ WLED Device 1
    ├─ WLED Device 2
    └─ Phone/Tablet (optional, for mobile control)
```

### Requirements

- All devices on same WiFi network
- WLED devices have static IP or reserved DHCP
- No firewall blocking port 80 to devices

## 📊 Storage

Saved devices are stored in **browser session storage**:

```json
[
  {
    "ip": "192.168.1.50",
    "deviceName": "Living Room"
  },
  {
    "ip": "192.168.1.51",
    "deviceName": "Bedroom"
  }
]
```

**Important**:
- Storage clears when browser closes
- For persistent storage, use incognito/private window
- (Future: will add localStorage option)

## 🔄 API Reference (Advanced)

### Direct Device Control

If needed, you can directly curl your device:

**Get Status**:
```bash
curl http://192.168.1.50/json
```

**Turn On**:
```bash
curl -X POST http://192.168.1.50/json/state -H "Content-Type: application/json" -d "{\"on\":true}"
```

**Set Color**:
```bash
curl -X POST http://192.168.1.50/json/state -H "Content-Type: application/json" -d "{\"seg\":[{\"col\":[[255,0,0]]}]}"
```

## 📚 More Information

For detailed documentation, see:
- **README.md** - Feature overview
- **INSTALLATION.md** - Detailed setup
- **CODE_REFERENCE.md** - Code snippets
- **UI_DESIGN_REFERENCE.md** - UI layouts

## ✅ Checklist for First Run

- [ ] Node.js installed (v22.20.0+)
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm start`)
- [ ] App opens in browser (http://localhost:4200)
- [ ] WLED device IP address known
- [ ] Device is on same network
- [ ] Added first device successfully
- [ ] Power toggle works
- [ ] Color picker works

## 🎓 Learning Path

1. **Start**: Add your first device
2. **Practice**: Toggle power and change colors
3. **Explore**: Try controlling multiple devices
4. **Customize**: Give devices meaningful names
5. **Advanced**: Read CODE_REFERENCE.md for technical details

## 🤝 Support

### Common Questions

**Q: Can I save devices permanently?**
A: Currently uses session storage (clears on close). LocalStorage support coming soon.

**Q: Can I control devices from outside my network?**
A: Currently requires local network. Remote access would need port forwarding or VPN.

**Q: Can I create device groups?**
A: Not yet, but it's planned for future versions.

**Q: What's the maximum number of devices?**
A: Theoretically unlimited, but tested with up to 50.

**Q: Do all WLED versions work?**
A: Requires firmware supporting `/json` endpoints (most recent versions).

### Getting Help

1. Check browser console (F12) for errors
2. Look at INSTALLATION.md for detailed info
3. See CODE_REFERENCE.md for technical details
4. Check WLED documentation at [wled.me](https://wled.me)

## 🚀 Next Steps

1. ✅ Get app running
2. ✅ Add your devices
3. ⬜ Explore the code
4. ⬜ Customize for your needs
5. ⬜ Deploy to production (see README)

## 📞 Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Watch mode (auto-recompile)
npm run watch
```

## 🎨 Customization Tips

Want to customize the app? Here are some easy changes:

**Change Title**:
- Edit `src/app/components/wled-controller/wled-controller.html`
- Change "WLED Controller" text

**Change Colors**:
- Edit `src/app/components/wled-controller/wled-controller.scss`
- Search for color values (e.g., `#ff9800`)

**Change Dialog Size**:
- Edit `src/app/components/wled-controller/wled-controller.ts`
- Line 51: `width: '400px'` - adjust pixel value

**Add New Field**:
- Edit dialog component
- Add to form group
- Update service methods

## ⚠️ Important Notes

- **Session Storage**: Devices clear when browser closes
- **WLED Version**: Requires modern firmware with JSON API
- **Network**: All devices must be on same local network
- **Permissions**: No authentication implemented (for local network use)

---

**Ready to get started?** Run these commands:

```bash
cd d:\Project\HomeControl
npm install
npm start
```

Then open http://localhost:4200 and add your first device!

---

**Need more help?** Check the documentation files included in the project.

**Latest Update**: January 2, 2026
