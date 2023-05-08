import React, { useState } from 'react'
import { StyleSheet, TextInput, View, ViewProps } from 'react-native'
import {
  GiphyClipsRendition,
  GiphyContent,
  GiphyDirection,
  GiphyGridView,
  GiphyMedia,
  GiphyMediaType,
  GiphyRendition,
} from '@giphy/react-native-sdk'

import { Dialog } from './Dialog'

type MediaGridSampleProps = {
  onMediaSelect: (media: GiphyMedia) => void
} & ViewProps

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginHorizontal: 8,
  },
  giphyGridView: {
    height: 400,
    marginHorizontal: 8,
  },
})

export function MediaGridSample(props: MediaGridSampleProps) {
  const { onMediaSelect, ...viewProps } = props
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  return (
    <View {...viewProps}>
      <TextInput
        autoFocus={false}
        onFocus={() => setSearchVisible(true)}
        onTouchEnd={() => setSearchVisible(true)}
        placeholder="Search..."
        style={styles.textInput}
        testID="gph-grid_search-stub"
        value={searchQuery}
      />
      <Dialog visible={searchVisible} onRequestClose={() => setSearchVisible(false)}>
        <TextInput
          autoFocus
          onChangeText={setSearchQuery}
          placeholder="Search..."
          style={styles.textInput}
          testID="gph-grid_search-input"
          value={searchQuery}
        />
        {searchVisible && (
          <GiphyGridView
            content={GiphyContent.search({
              searchQuery: searchQuery,
              mediaType: GiphyMediaType.Sticker,
            })}
            cellPadding={3}
            clipsPreviewRenditionType={GiphyClipsRendition.FixedHeight}
            fixedSizeCells={false}
            orientation={GiphyDirection.Vertical}
            renditionType={GiphyRendition.FixedWidth}
            spanCount={1}
            showCheckeredBackground={false}
            style={styles.giphyGridView}
            testID="gph-grid-view"
            onContentUpdate={(e) => console.log('onContentUpdate', JSON.stringify(e.nativeEvent, null, 2))}
            onScroll={(e) => console.log('onScroll', JSON.stringify(e.nativeEvent, null, 2))}
            onMediaSelect={(e) => {
              setSearchVisible(false)
              onMediaSelect(e.nativeEvent.media)
            }}
          />
        )}
      </Dialog>
    </View>
  )
}
