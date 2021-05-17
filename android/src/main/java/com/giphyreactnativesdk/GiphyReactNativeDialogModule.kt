package com.giphyreactnativesdk

import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.giphy.sdk.ui.GPHSettings
import com.giphy.sdk.ui.views.GiphyDialogFragment

class GiphyReactNativeDialogModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {

  private var settings: GPHSettings = GPHSettings()
  private var gifsDialog: GiphyDialogFragment? = null

  override fun getName(): String {
    return "GiphyReactNativeDialog"
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

    gifsDialog!!.show(fragmentManager, "giphy_view")
  }

  @ReactMethod
  fun hide(){
    gifsDialog!!.dismiss()
  }
}
