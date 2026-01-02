# WLED Controller - UI Design Reference

## Screen Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  WLED Controller                                  [+ Add Device]  │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                        UNIVERSAL CONTROL                         │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │  [  Power Off All  ] [  Power On All  ]                   │ │
│  │                                                             │ │
│  │  Set Color (All Devices):  [Color Preview]  [Color Picker]│ │
│  │                                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                        CONNECTED DEVICES                          │
│                                                                   │
│  ┌──────────────────────┐  ┌──────────────────────┐             │
│  │ Living Room          │  │ Bedroom              │             │
│  │ 192.168.1.50         │  │ 192.168.1.51         │             │
│  │                      │  │                      │             │
│  │  [Power] [Color]     │  │  [Power] [Color]     │             │
│  │        [Prev][Hex]   │  │        [Prev][Hex]   │             │
│  │                      │  │                      │             │
│  │  [⚙ Advanced Options]│  │  [⚙ Advanced Options]│             │
│  └──────────────────────┘  └──────────────────────┘             │
│                                                                   │
│  ┌──────────────────────┐  ┌──────────────────────┐             │
│  │ Kitchen              │  │ 192.168.1.52         │             │
│  │ 192.168.1.52         │  │                      │             │
│  │                      │  │                      │             │
│  │  [Power] [Color]     │  │  [Power] [Color]     │             │
│  │        [Prev][Hex]   │  │        [Prev][Hex]   │             │
│  │                      │  │                      │             │
│  │  [⚙ Advanced Options]│  │  [⚙ Advanced Options]│             │
│  └──────────────────────┘  └──────────────────────┘             │
│                                                                   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Add Device Dialog

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  Add WLED Device                                 │
│  ═══════════════════════════════════════════    │
│                                                  │
│  Device Name (Optional)                          │
│  ┌────────────────────────────────────────────┐  │
│  │ e.g., Living Room Lights                  │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  WLED IP Address *                               │
│  ┌────────────────────────────────────────────┐  │
│  │ e.g., 192.168.1.50                        │  │
│  └────────────────────────────────────────────┘  │
│  ✓ Valid IP address required                     │
│                                                  │
│  ────────────────────────────────────────────    │
│                    [Cancel]  [Add Device]        │
│                                                  │
└──────────────────────────────────────────────────┘
```

## Device Card Detail

```
┌─────────────────────────────────────────┐
│ Living Room                              │
│ 192.168.1.50                             │
├─────────────────────────────────────────┤
│                                          │
│ [⚡]  Color:  [████]  [Color Picker]    │
│ Power          #FF6B6B                  │
│ On/Off                                  │
│                                          │
├─────────────────────────────────────────┤
│           [⚙ Advanced Options]           │
└─────────────────────────────────────────┘

Legend:
─────
[⚡]   = Power toggle button (orange when ON)
[████] = Color preview square
[Color Picker] = Hidden file input
[⚙ Advanced Options] = Advanced settings button
```

## Responsive Breakpoints

### Desktop (> 768px)
- Header: Flex, space-between
- Universal Control: Horizontal layout (4 rows max)
- Device Grid: 3-4 columns (350px min-width)

### Tablet/Mobile (≤ 768px)
- Header: Stack vertically, full-width button
- Universal Control: Stack vertically
- Device Grid: Single column
- Spacing: Reduced padding

## Color Scheme

```
Primary Colors:
  Button Active: #3f51b5 (Indigo)
  Warn: #f44336 (Red)
  Accent: #ff9800 (Orange)
  
Power On: #ff9800 (Orange)
Power Off: #999999 (Gray)

Text:
  Primary: #333333
  Secondary: #666666
  Disabled: #999999
  Hint: #cccccc

Background:
  Card: #ffffff
  Surface: #f5f5f5
  Border: #dddddd
```

## Spacing Scale

```
4px  - Tight spacing
8px  - Small spacing
12px - Form spacing
16px - Component spacing
20px - Section spacing
24px - Page padding
32px - Large sections
60px - Empty state padding
```

## Typography

```
Header (h1):
  Size: 28px
  Weight: 500
  Color: #333

Section Title (h2):
  Size: 22px
  Weight: 500
  Color: #333

Card Title:
  Size: 18px
  Weight: 500
  
Card Subtitle:
  Size: 12px
  Color: #999

Body Text:
  Size: 14px
  Color: #666

Labels:
  Size: 12px-14px
  Weight: 500
```

## Component States

### Device Card Power Button
```
OFF State:      [⚡] gray, cursor pointer
ON State:       [⚡] orange, cursor pointer
Hover:          Background lighten slightly
```

### Device Color Preview
```
Default:        White (#ffffff)
Selected:       User-selected color
Hover:          Cursor changes to pointer
```

### Universal Control Buttons
```
Default:        Material button style
Hover:          Background darken
Disabled:       Opacity 0.5, cursor default
Active:         Pressed state with shadow
```

## Dialog States

### Form Validation
```
Valid IP:       No error text, button enabled
Invalid IP:     Red error text, button disabled
Empty Field:    Required error, button disabled
```

### Color Input States
```
Default:        Type color picker hidden
Focus:          Color picker appears on click
Selected:       Color updates immediately
```

## Accessibility Features

- ✓ Material design with sufficient contrast
- ✓ Icon buttons have tooltips
- ✓ Form labels properly associated
- ✓ Error messages descriptive
- ✓ Keyboard navigation support
- ✓ Focus states visible
- ✓ ARIA labels where needed

## Mobile Considerations

- ✓ Touch-friendly button sizes (44px minimum)
- ✓ Readable text sizes (14px minimum)
- ✓ Color picker accessible via native OS picker
- ✓ Full-width inputs on small screens
- ✓ Stacked layout on narrow viewports
- ✓ Optimized spacing for touch interaction

---

## Implementation Notes

### Color Picker
- HTML5 native color input
- Displays OS color picker on click
- Returns hex color value (#RRGGBB)
- Converted to RGB for API calls

### Power Toggle
- Icon button with on/off states
- Visual feedback with color change
- Tooltip shows next action
- Optimistic UI update

### Device Card Grid
- CSS Grid with auto-fill
- 350px minimum column width
- Automatic responsive behavior
- No media query hacks needed

### Dialog
- Material Modal Dialog
- Centered on screen
- Fixed width 400px on desktop
- Full-width on mobile
- Animations on open/close
