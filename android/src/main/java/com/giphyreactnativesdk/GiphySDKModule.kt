package com.giphyreactnativesdk

import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.giphy.sdk.ui.GPHSettings
import com.giphy.sdk.ui.Giphy
import com.giphy.sdk.ui.themes.GPHTheme
import com.giphy.sdk.ui.themes.GridType
import com.giphy.sdk.ui.views.GiphyDialogFragment
import com.giphyreactnativesdk.utils.RNSDKInfo

class GiphySDKModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
  val VERIFICATION_MODE_KEY = "verificationMode"

  override fun getName(): String {
    return "GiphyReactNativeSDK"
  }

  @ReactMethod
  fun configure(settings: ReadableMap) {
    val apiKey = settings.getString("apiKey")
    var verificationMode = false

    if (settings.hasKey(VERIFICATION_MODE_KEY)) {
      verificationMode = settings.getBoolean(VERIFICATION_MODE_KEY)
    }

    if (apiKey != null) {
      val appInfo = RNSDKInfo(reactApplicationContext)
      Giphy.configure(
        reactApplicationContext,
        apiKey,
        verificationMode,
        metadata = hashMapOf(
          appInfo.name to appInfo.version
        )
      )
    }
  }

  @ReactMethod
  fun showGiphyView() {
    val settings = GPHSettings(GridType.waterfall, GPHTheme.Dark)
    val gifsDialog = GiphyDialogFragment.newInstance(settings)

    val compatActivity: AppCompatActivity = currentActivity as AppCompatActivity
    val fragmentManager = compatActivity.supportFragmentManager

    gifsDialog.show(fragmentManager, "giphy_view")
  }
}
