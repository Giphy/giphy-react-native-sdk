## GIPHY SDK Localization

To enable localization for the SDK in your application, follow the steps outlined below for both iOS and Android platforms. This guide will also cover how to add support for additional languages. Note that our SDK is now based on the device language, not on an app-basis, ensuring that your app will display content in the language set by the user's device.

### iOS Localization

#### Adding Localization Files

1. Create Localizable.strings file:
    - In your Xcode project, create/navigate to the `Localization` folder.
    - Right-click on the folder and select `New File....`
    - Choose `Strings File` from the templates and name it `Localizable.strings`.
    - Add the file to all the targets in your project.
2. Localize `Localizable.strings` File:
    - Select the `Localizable.strings` file in the Project Navigator.
    - In the File Inspector (right-hand pane), find the `Localization` section.
    - Click the `Localize...` button and choose your development language.
    - In the `Localizable.strings` file, add key-value pairs for the strings you want to localize.

#### Example Localizable.strings

```
"no_gifs_found" = "No GIFs found";
"no_stickers_found" = "No stickers found";
"no_text_found" = "No text found";
"no_clips_found" = "No clips found";
"search_giphy" = "Search GIPHY";
"something_went_wrong" = "Something went wrong. Please try again later.";
"gifs" = "GIFs";
"stickers" = "Stickers";
"text" = "Text";
"emoji" = "Emoji";
"recents" = "Recents";
"clips" = "Clips";
"select" = "Select";
"select_gif" = "Select GIF";
"select_sticker" = "Select Sticker";
"select_clip" = "Select Clip";
"select_emoji" = "Select Emoji";
"more_from" = "More from %@";
"remove_from_recents" = "Remove from recents";
"back" = "Back";
"information" = "Information";
```

#### Adding More Languages
1. Add a New Language:
    - In Xcode, select your project.
    - Go to the `Info` tab and click the `+` button under `Localizations`.
    - Select the new language you want to add.
2. Localize `Localizable.strings` File:
    - Xcode will prompt you to localize `Localizable.strings` for the new language.
    - Add translations for your strings in the newly created `Localizable.strings` file.


### Android Localization

#### Adding Localization Files

1. Create strings.xml file if it's not available:
    - In your Android project, navigate to the `res/values` folder.
    - Right-click on the values folder and select `New` > `Value Resource File`.
    - Name the file `strings.xml` and click OK.
2. Adding Strings::
    - Open `strings.xml` and add your string resources.

#### Example strings.xml

```
<resources>
    <string name="app_name">GiphyReactNativeSdk Example</string>
    <string name="gph_retry">Retry</string>
    <string name="gph_error_generic_list_loading">Oh NO! Something Went Wrong.</string>
    <string name="gph_search_giphy">Search GIPHY</string>
    <string name="gph_gifs">GIFs</string>
    <string name="gph_clips">Clips</string>
    <string name="gph_stickers">Stickers</string>
    <string name="gph_select">Select</string>
    <string name="gph_choose_gif">Select GIF</string>
    <string name="gph_choose_clip">Select Clip</string>
    <string name="gph_choose_sticker">Select Sticker</string>
    <string name="gph_choose_emoji">Select Emoji</string>
    <string name="gph_attribution_back">Back</string>
    <string name="gph_back">Back</string>
    <string name="gph_view_on_giphy">View on GIPHY</string>
    <string name="gph_copy_link">Copy Link</string>
    <string name="gph_more_by">More by @%1$s</string>
    <string name="gph_text">Text</string>
    <string name="gph_emoji">Emoji</string>
    <string name="gph_recents">Recents</string>
    <string name="gph_error_no_gifs_found">No GIFs found</string>
    <string name="gph_error_no_stickers_found">No stickers found</string>
    <string name="gph_error_no_texts_found">No text found</string>
    <string name="gph_error_no_recent_found">No recents found</string>
    <string name="gph_error_no_clips_found">No clips found</string>
    <string name="gph_remove">Remove</string>
    <string name="gph_more_by_you">More by You</string>
    <string name="gph_video_error">The clip is currently unavailable</string>
    <string name="gph_clear_search">Clear search</string>
    <string name="gph_info">Information</string>
</resources>
```

#### Adding More Languages
1. Create New Values Folder:
    - To add a new language, create a new values folder with the language code. For example, for French, create a folder named `values-fr`.
    - Right-click on the `res` folder, select `New` > `Directory`, and name it `values-fr`.
2. Create strings.xml File:
    - Inside the newly created `values-fr` folder, right-click and select `New` > `Value Resource File`.
    - Name the file `strings.xml`.
3. Add Translations:
    - Open the newly created `strings.xml` file and add your translations.


### Device-Based Language Setting

Our SDK now bases its localization on the device's language settings rather than on an app-basis. This means that your app will automatically adapt to the language configured on the user's device, providing a seamless and intuitive user experience.

#### Benefits of Device-Based Localization:
- Consistency: Users experience the app in their preferred language without needing to configure language settings within the app.
- Simplicity: Developers don't need to implement additional logic to handle language selection within the app.
- User Experience: Enhances the user experience by ensuring the app language matches the device's language settings.