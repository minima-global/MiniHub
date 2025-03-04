# Changelog

##### [0.24.0] - 04 Mar 25

- Implemented new onboarding flow
- Minor UI changes to the settings page

##### [0.23.0] - 18 Feb 25

- Added the ability to open the security app from the status bar when the node needs quick resync
- Added a warning when updating a MiniDapp that the name does not match the existing one

##### [0.22.1] - 22 Jan 25

- Fixed an issue where the Health app was appearing twice in the folder view

##### [0.22.0] - 21 Jan 25

- Additional refinements to the block height loading state

##### [0.21.1] - 25 Nov 24

- Fix block height loading state

##### [0.21.0] - 18 Nov 24

- Fix block height loading state
- Text content changes in Join the network and Add connections sections
- You can now update MiniHUB in the update MiniDapp section

##### [0.20.1] - 31 Oct 24

- Updated terms and conditions

 ##### [0.20.0] - 09 Oct 24

- Auto connect now display the same dialog as with manual on success
- Remove Add Peers after successfully adding peers
- Tweak Add Peers design button in header

##### [0.19.1] - 20 Sept 24

- Tweak auto connect

##### [0.19.0] - 15 Sept 24

- Profile avatar design fix
- Added a go to add peers button for quicker access in header when dismiss add peers
- Added a Mx address to Profile for quick copy address
- Auto-connect peers using ping peers

##### [0.18.1] - 24 Jun 24

- Download MiniDapps to Downloads folder
- Update avatar, make rounded, remove mixed-blend mode


##### [0.17.1] - 03 Jun 24

- Cursor pointer over Maxima Profile
- Hide Purple beacon while tutorialing
- Remove X close button on tutorial

##### [0.17.0] - 03 Jun 24

- Maxima Icon
- Sort apps alphabetically
- Folder settings
- Change your folder's background
- Toggle on/off animation
- Animation is now smooth and not wobbly

##### [0.15.9] - 03 May 24

- Default folder on start up

##### [0.15.8] - 29 April 24

- Fix Wallet search
- Copy update

##### [0.15.7] - 29 April 24

- Onboard controlled mode
- Folder mode/default mode for the onboarding tutorial
- Better error handle for sharing app

##### [0.14.3] - 08 November 23

- Tweak where Maxima name is
- Set folders first
- Alphabetically order folders
- Remove order by filters
- design tweaks

##### [0.14.2] - 06 November 23

- toggle folders layout
- pull in Maxima name on introduction screen, if already set
- add desktop connect on product onboard, update settings copy
- make MDS Fail screen take precedent over introduction page
- removed simulated folders

##### [0.14.1] - 05 November 23

- check peers/add peers when onboarding is skipped or ended
- toggle onboard tutorial in Settings
- design tweak on onboard tool

##### [0.14.0] - 02 November 23

- Added v1 Folders
- Added introductioon page
- Added maximaName
- Added onboarding

##### [0.13.1] - 12 September 23

- Added time to block info in status bar
- New mds.js

##### [0.12.11] - 25 August 23

- The user is navigated back to the home screen after adding a peer list

##### [0.12.10] - 24 August 23

- Additional fix to the monkey patch for p2p disabled nodes as it still shows the 'Share connections' nav button

##### [0.12.9] - 23 August 23

- Added monkey patch for p2p disabled nodes as it still shows the 'Share connections' nav button

##### [0.12.8] - 23 August 23

- Fixed issue with continue to add connections later modal from popping up when user is wanting to add connections
- Minor ui tweaks for adding / sharing connections

##### [0.12.6] - 23 August 23

- Updated the copy on the peers section
- Separated the peers section to 'Add connections' and 'Share connections'

##### [0.12.5] - 23 August 23

- Fixes paste button in peers section

##### [0.12.4] - 21 August 23

- Updating MiniHUB now closes the window instead of shutting down
- If connection has failed in internal browser, there will be a button to close the window to allow the user to re-open MinimaOS with a new session id

##### [0.12.3] - 21 August 23

- Minor text changes

##### [0.12.2] - 21 August 23

- The MDS Fail event will now show the shutdown node button on internal browser

##### [0.12.1] - 18 August 23

- Fixes an issue on windows when setting a wallpaper over an existing custom wallpaper

##### [0.12.0] - 17 August 23

- Compacting the database when shutting down the node is now optional

##### [0.11.3] - 15 August 23

- Minor text changes
- Write access checks for the MiniDapp has been updated

##### [0.11.2] - 11 August 23

- Minor text changes

##### [0.11.1] - 11 August 23

- Fixes an issue with UI overlap when the peers list extends beyond the viewports height

##### [0.11.0] - 10 August 23

- The user will be presented with a no peers modal if `haspeers` is false on app load

##### [0.10.2] - 09 August 23

- Setting a custom wallpaper functionality has been updated

##### [0.10.1] - 09 August 23

- Fixed peers response as the response from the node has changed

##### [0.10.0] - 08 August 23

- Minor text changes
- Added peers functionality in settings
- Added the ability to set a custom wallpaper

##### [0.9.1] - 03 August 23

- Added support for going back to the previous page when installing, updating or deleting a Minidapp
- Added support for going back when viewing the settings page
- Added support for external apps

##### [0.6.1] - 28 July 23

- Revised Chain Error warning logic
- Show warning symbol if Minima node is 5 minutes or more behind
- Added support for `Android.shutdown` when running the MiniDapp in the Minima internal browser
- Added support for swiping the app list on desktop using a laptop trackpad
- Minor text changes

##### [0.5.6] - 10 July 23

- Removed copy MDS password to clipboard
- Added ability to update MiniHUB in the settings menu
- Added support for `MDSFAIL` event
- Minor UI fixes

##### [0.5.3] - 06 July 23

- Added support for Android.showTitleBar
- Fixed issue with installing MDS files with spaces in the file name
- Replaced `dapplink` deep links with session id from MDS response
- Updating an app will now refresh the app icon
- Clicking the block in the title bar will now open the `Health` MiniDapp if installed

##### [0.4.3] - 15 June 23

- Fixed Firefox UI glitches
- Updated Logout functionality

##### [0.3.5] - 14 June 23

- Re-enabled shutdown on Minima internal browser
- Minor UI fixes

##### [0.3.2] - 12 June 23

- Minor text changes
- Added read and write warning modal when changing read and write permission of a MiniDapp
