---
uid: 07lbo7ps
type: kbats
id: NWD-KBA-FRONT-012
title: Scanner Shows “Device Offline”
department: FRONT
number: "12"
version: "1.0"
status: In Review
owner: Jordan Lee
approver: Practice Director
classification: Internal Use
---

# Scanner Shows “Device Offline”

## 1. OVERVIEW — Summary

### Summary

The front-desk ID scanner stops responding after a Windows update. Re-seating the USB cable and restarting the scanner service fixes it.

### Applies To

- Front desk PCs
- Scanner model [TBD]

### Audience

Front desk staff, Tier 1

## 2. ISSUE — Symptoms & Cause

### Symptoms

- Scan button does nothing
- Tray icon shows “Device offline”

### Cause

Windows update resets USB power saving on the scanner port.

## 3. RESOLUTION — Resolution

### Resolution Steps

1. **Unplug and re-plug the scanner’s USB cable**
   Use the rear USB port, not a hub.
2. **Restart the scanner service**
   Start menu → Scanner Utility → Restart service.
3. **Scan a test card**
   Confirm the image appears in the patient record.

### Workaround

Type the ID details by hand and attach a phone photo.

### Escalation

If it fails twice in a day, open a ticket with the MSP.

## 4. MORE — Related & Keywords

### Related Articles

- [[NWD-SOP-IT-004 - Verify Nightly Backups]]

### Keywords

scanner, offline, ID card, front desk

## Revision History

| Version | Date | Author | Change Summary |
| --- | --- | --- | --- |
| 1.0 | 2026-10-20 | Jordan Lee | Initial article |
