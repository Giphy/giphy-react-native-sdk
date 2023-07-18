package com.giphyreactnativesdk

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class GiphyRNSdkPackage : TurboReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return if (name == GiphySDKModule.NAME) {
      GiphySDKModule(reactContext)
    } else {
      null
    }
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      val isTurboModule: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      moduleInfos[GiphySDKModule.NAME] = ReactModuleInfo(
        GiphySDKModule.NAME,
        GiphySDKModule.NAME,
        false,
        false,
        true,
        false,
        isTurboModule
      )
      moduleInfos
    }
  }
}
