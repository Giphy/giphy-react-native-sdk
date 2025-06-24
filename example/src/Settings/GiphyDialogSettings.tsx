import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  GiphyClipsRendition,
  GiphyContentType,
  GiphyDialogConfig,
  GiphyFileExtension,
  GiphyRating,
  GiphyRendition,
  GiphyStickersColumnCount,
  GiphyThemePreset,
} from '@giphy/react-native-sdk'

import { Card } from './Card'
import { customThemeSample } from '../theme/customThemeSample'
import { NumberInputCard } from './InputCard'
import { PickerSelectCard } from './PickerSelectCard'
import { SwitchCard, SwitchCardField } from './SwitchCard'

export type GiphyDialogSettingsProps = {
  settings: GiphyDialogConfig
  onSettingsChange: (settings: Required<GiphyDialogConfig>) => void
}

export const DEFAULT_DIALOG_SETTINGS: Required<GiphyDialogConfig> = {
  clipsPreviewRenditionType: GiphyClipsRendition.FixedWidth,
  confirmationRenditionType: GiphyRendition.FixedWidth,
  enableDynamicText: false,
  fileType: GiphyFileExtension.GIF,
  mediaTypeConfig: [GiphyContentType.Gif, GiphyContentType.Sticker, GiphyContentType.Clips],
  rating: GiphyRating.Unrated,
  renditionType: GiphyRendition.FixedWidth,
  selectedContentType: GiphyContentType.Gif,
  shouldLocalizeSearch: false,
  showCheckeredBackground: false,
  showConfirmationScreen: false,
  showSuggestionsBar: true,
  stickerColumnCount: GiphyStickersColumnCount.Three,
  theme: GiphyThemePreset.Dark,
  trayHeightMultiplier: 0.7,
  enableEdgeToEdge: false
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
})

function enumToPickerItems<K extends string, V>(obj: Record<K, V>): { label: K; value: V }[] {
  return Object.entries(obj)
    .filter(([label]) => !Number.isSafeInteger(+label))
    .map(([label, value]) => ({
      label: label as K,
      value: value as V,
    }))
}

export const GiphyDialogSettings: React.FC<GiphyDialogSettingsProps> = (props) => {
  const { settings: settingsProp, onSettingsChange } = props
  const settings: Required<GiphyDialogConfig> = {
    ...DEFAULT_DIALOG_SETTINGS,
    ...settingsProp,
  }

  const updateSettings = (updates: Partial<GiphyDialogConfig>) => onSettingsChange({ ...settings, ...updates })

  return (
    <View testID="gph-settings" style={styles.container}>
      <PickerSelectCard
        title="Theme"
        testID="gph-settings_theme"
        items={[...enumToPickerItems(GiphyThemePreset), { label: 'Custom', value: customThemeSample }]}
        value={settings.theme}
        onValueChange={(theme) => updateSettings({ theme })}
      />
      <Card title="Media Type Config" testID="gph-settings_media-type-config">
        {enumToPickerItems(GiphyContentType).map(({ value, label }) => {
          const isEnabled = settings.mediaTypeConfig.includes(value)
          return (
            <SwitchCardField
              key={label}
              selectedLabel={label}
              testID={value}
              unselectedLabel={label}
              value={isEnabled}
              onValueChange={() =>
                updateSettings({
                  mediaTypeConfig: isEnabled
                    ? settings.mediaTypeConfig.filter((a) => a !== value)
                    : [...settings.mediaTypeConfig, value],
                })
              }
            />
          )
        })}
      </Card>
      <SwitchCard
        title="Enable Dynamic Text"
        testID="gph-settings_dynamic-text"
        value={settings.enableDynamicText}
        onValueChange={(enableDynamicText) => updateSettings({ enableDynamicText })}
      />
      <PickerSelectCard
        title="Rating"
        testID="gph-settings_rating"
        items={enumToPickerItems(GiphyRating)}
        value={settings.rating}
        onValueChange={(rating) => updateSettings({ rating })}
      />
      <PickerSelectCard
        title="Rendition Type"
        testID="gph-settings_rendition-type"
        items={enumToPickerItems(GiphyRendition)}
        value={settings.renditionType}
        onValueChange={(renditionType) => updateSettings({ renditionType })}
      />
      <PickerSelectCard
        title="Clips Preview Rendition Type"
        testID="gph-settings_clips-preview-rendition-type"
        items={enumToPickerItems(GiphyClipsRendition)}
        value={settings.clipsPreviewRenditionType}
        onValueChange={(clipsPreviewRenditionType) => updateSettings({ clipsPreviewRenditionType })}
      />
      <PickerSelectCard
        title="File Type"
        testID="gph-settings_file-type"
        items={enumToPickerItems(GiphyFileExtension)}
        value={settings.fileType}
        onValueChange={(fileType) => updateSettings({ fileType })}
      />
      <SwitchCard
        title="Show Confirmation Screen"
        testID="gph-settings_confirmation-screen"
        value={settings.showConfirmationScreen}
        onValueChange={(showConfirmationScreen) => updateSettings({ showConfirmationScreen })}
      />
      <PickerSelectCard
        title="Sticker Column Count"
        testID="gph-settings_sticker-column-count"
        items={enumToPickerItems(GiphyStickersColumnCount)}
        value={settings.stickerColumnCount}
        onValueChange={(stickerColumnCount) => updateSettings({ stickerColumnCount })}
      />
      <SwitchCard
        title="Should Localize Search (*iOS)"
        testID="gph-settings_localize-search"
        value={settings.shouldLocalizeSearch}
        onValueChange={(shouldLocalizeSearch) => updateSettings({ shouldLocalizeSearch })}
      />
      <NumberInputCard
        title="Tray Height Multiplier (*iOS)"
        testID="gph-settings_tray-height"
        value={settings.trayHeightMultiplier}
        onNumberChange={(trayHeightMultiplier) => updateSettings({ trayHeightMultiplier })}
      />
      <PickerSelectCard
        title="Confirmation Rendition Type (*Android)"
        testID="gph-settings_confirmation-rendition-type"
        items={enumToPickerItems(GiphyRendition)}
        value={settings.confirmationRenditionType}
        onValueChange={(confirmationRenditionType) => updateSettings({ confirmationRenditionType })}
      />
      <PickerSelectCard
        title="Selected Content Type"
        testID="gph-settings_selected-content-type"
        items={enumToPickerItems(GiphyContentType)}
        value={settings.selectedContentType}
        onValueChange={(selectedContentType) => updateSettings({ selectedContentType })}
      />
      <SwitchCard
        title="Show Checkered Background (*Android)"
        testID="gph-settings_checkered-background"
        value={settings.showCheckeredBackground}
        onValueChange={(showCheckeredBackground) => updateSettings({ showCheckeredBackground })}
      />
      <SwitchCard
        title="Show Suggestions Bar (*Android)"
        testID="gph-settings_suggestions-bar"
        value={settings.showSuggestionsBar}
        onValueChange={(showSuggestionsBar) => updateSettings({ showSuggestionsBar })}
      />
      <SwitchCard
        title="Enable Edge-to-Edge UI Rendering (*Android)"
        testID="gph-settings_edge-to-edge"
        value={settings.enableEdgeToEdge}
        onValueChange={(enableEdgeToEdge) => updateSettings({ enableEdgeToEdge })}
      />
    </View>
  )
}
