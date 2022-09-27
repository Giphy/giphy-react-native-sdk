package com.giphyreactnativesdk

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class GiphyReactNativeSdkPackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    return listOf<NativeModule>(
      GiphySDKModule(reactContext),
      GiphyReactNativeDialogModule(reactContext),
      GiphyVideoManagerModule(reactContext),
    )
  }

  override fun createViewManagers(reactContext: ReactApplicationContext):
    List<ViewManager<out View, out ReactShadowNode<*>>> {
    return listOf(
      GiphyMediaViewManager(),
      GiphyGridViewManager(),
      GiphyVideoViewManager()
    )
  }
}
