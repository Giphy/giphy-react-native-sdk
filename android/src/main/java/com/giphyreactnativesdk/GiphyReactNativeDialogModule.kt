package com.giphyreactnativesdk

import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.*
import com.giphy.sdk.core.models.Image
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphy.sdk.ui.GPHContentType
import com.giphy.sdk.ui.GPHSettings
import com.giphy.sdk.ui.utils.aspectRatio
import com.giphy.sdk.ui.views.GiphyDialogFragment


class GiphyReactNativeDialogModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {

  companion object {
    val TAG = GiphyReactNativeDialogModule::class.java.simpleName
  }

  private var settings: GPHSettings = GPHSettings()
  private var gifsDialog: GiphyDialogFragment? = null

  override fun getName(): String {
    return "GiphyReactNativeDialog"
  }

  private fun getGifURL(media: Media, settings: GPHSettings): String? {
    val rendition = settings.renditionType ?: RenditionType.downsized
    val image = readInstanceProperty<Image>(media.images, rendition.name)
    return image.gifUrl
  }

  private fun getGifSelectionListener() = object : GiphyDialogFragment.GifSelectionListener {
    override fun onGifSelected(media: Media, searchTerm: String?, selectedContentType: GPHContentType) {
      val mediaMap = Arguments.createMap()
      mediaMap.putString("id", media.id)
      mediaMap.putString("url", getGifURL(media, settings))
      mediaMap.putDouble("aspectRatio", media.aspectRatio.toDouble())

      val params = Arguments.createMap()
      params.putMap("media", mediaMap)

      emitEvent(reactApplicationContext, GiphyDialogEvents.MediaSelected.rnEvent, params)

    }

    override fun onDismissed(selectedContentType: GPHContentType) {
      emitEvent(reactApplicationContext, GiphyDialogEvents.Dismissed.rnEvent, null)
    }

    override fun didSearchTerm(term: String) {}
  }

  @ReactMethod
  fun configure(options: ReadableMap) {
    settings = giphySettingsFromReadableMap(options, settings)
  }

  private fun initializeDialog() {
    gifsDialog = GiphyDialogFragment.newInstance(settings)
  }

  @ReactMethod
  fun show(){
    initializeDialog()

    val compatActivity: AppCompatActivity = currentActivity as AppCompatActivity
    val fragmentManager = compatActivity.supportFragmentManager

    gifsDialog!!.gifSelectionListener = getGifSelectionListener()
    gifsDialog!!.show(fragmentManager, "giphy_view")
  }

  @ReactMethod
  fun hide(){
    gifsDialog!!.dismiss()
  }
}
