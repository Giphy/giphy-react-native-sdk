import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
  GiphyDialogConfig,
  GiphyMediaType,
  GiphyRating,
  GiphyRendition,
  GiphyStickersColumnCount,
  GiphyThemePreset,
} from 'giphy-react-native-sdk'

import { Card } from './Card'
import { SwitchCard, SwitchCardField } from './SwitchCard'
import { PickerSelectCard } from './PickerSelectCard'
import { NumberInputCard } from './InputCard'

export type GiphyDialogSettingsProps = {
  settings: GiphyDialogConfig
  onSettingsChange: (settings: Required<GiphyDialogConfig>) => void
}

const DEFAULT_SETTINGS: Required<GiphyDialogConfig> = {
  mediaTypes: [
    GiphyMediaType.Gif,
    GiphyMediaType.Emoji,
    GiphyMediaType.Text,
    GiphyMediaType.Sticker,
    GiphyMediaType.Recents,
  ],
  rating: GiphyRating.PG13,
  renditionType: GiphyRendition.FixedWidth,
  showConfirmationScreen: false,
  stickerColumnCount: GiphyStickersColumnCount.Three,
  theme: GiphyThemePreset.Light,
  shouldLocalizeSearch: false,
  trayHeightMultiplier: 0.7,
  confirmationRenditionType: GiphyRendition.FixedWidth,
  selectedContentType: GiphyMediaType.Gif,
  showCheckeredBackground: false,
  showSuggestionsBar: true,
  useBlurredBackground: false,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
})

function enumToPickerItems<K extends string, V>(
  obj: Record<K, V>
): { label: K; value: V }[] {
  return Object.entries(obj).map(([label, value]) => ({
    label: label as K,
    value: value as V,
  }))
}

export const GiphyDialogSettings: React.FC<GiphyDialogSettingsProps> = (
  props
) => {
  const { settings: settingsProp, onSettingsChange } = props
  const settings: Required<GiphyDialogConfig> = {
    ...DEFAULT_SETTINGS,
    ...settingsProp,
  }

  const updateSettings = (updates: Partial<GiphyDialogConfig>) =>
    onSettingsChange({ ...settings, ...updates })

  return (
    <View style={styles.container}>
      <PickerSelectCard
        title="Theme"
        items={enumToPickerItems(GiphyThemePreset)}
        value={settings.theme}
        onValueChange={(theme) => updateSettings({ theme })}
      />
      <Card title="Media Type">
        {enumToPickerItems(GiphyMediaType).map(({ value, label }) => {
          const isEnabled = settings.mediaTypes.includes(value)
          return (
            <SwitchCardField
              selectedLabel={label}
              unselectedLabel={label}
              value={isEnabled}
              onValueChange={() =>
                updateSettings({
                  mediaTypes: isEnabled
                    ? settings.mediaTypes.filter((a) => a !== value)
                    : [...settings.mediaTypes, value],
                })
              }
            />
          )
        })}
      </Card>
      <PickerSelectCard
        title="Rating"
        items={enumToPickerItems(GiphyRating)}
        value={settings.rating}
        onValueChange={(rating) => updateSettings({ rating })}
      />
      <PickerSelectCard
        title="Rendition Type"
        items={enumToPickerItems(GiphyRendition)}
        value={settings.renditionType}
        onValueChange={(renditionType) => updateSettings({ renditionType })}
      />
      <SwitchCard
        title="Show Confirmation Screen"
        value={settings.showConfirmationScreen}
        onValueChange={(showConfirmationScreen) =>
          updateSettings({ showConfirmationScreen })
        }
      />
      <PickerSelectCard
        title="Sticker Column Count"
        items={enumToPickerItems(GiphyStickersColumnCount)}
        value={settings.stickerColumnCount}
        onValueChange={(stickerColumnCount) =>
          updateSettings({ stickerColumnCount })
        }
      />
      <SwitchCard
        title="Should Localize Search (*iOS)"
        value={settings.shouldLocalizeSearch}
        onValueChange={(shouldLocalizeSearch) =>
          updateSettings({ shouldLocalizeSearch })
        }
      />
      <NumberInputCard
        title="Tray Height Multiplier (*iOS)"
        value={settings.trayHeightMultiplier}
        onNumberChange={(trayHeightMultiplier) =>
          updateSettings({ trayHeightMultiplier })
        }
      />
      <PickerSelectCard
        title="Confirmation Rendition Type (*Android)"
        items={enumToPickerItems(GiphyRendition)}
        value={settings.confirmationRenditionType}
        onValueChange={(confirmationRenditionType) =>
          updateSettings({ confirmationRenditionType })
        }
      />
      <PickerSelectCard
        title="Selected Content Type (*Android)"
        items={enumToPickerItems(GiphyMediaType)}
        value={settings.selectedContentType}
        onValueChange={(selectedContentType) =>
          updateSettings({ selectedContentType })
        }
      />
      <SwitchCard
        title="Show Checkered Background (*Android)"
        value={settings.showCheckeredBackground}
        onValueChange={(showCheckeredBackground) =>
          updateSettings({ showCheckeredBackground })
        }
      />
      <SwitchCard
        title="Show Suggestions Bar (*Android)"
        value={settings.showSuggestionsBar}
        onValueChange={(showSuggestionsBar) =>
          updateSettings({ showSuggestionsBar })
        }
      />
      <SwitchCard
        title="Use Blurred Background (*Android)"
        value={settings.useBlurredBackground}
        onValueChange={(useBlurredBackground) =>
          updateSettings({ useBlurredBackground })
        }
      />
    </View>
  )
}
