package com.giphyreactnativesdk

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

@Suppress("unused")
class RTNGiphySdkPackage : TurboReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return when (name) {
      RTNGiphySdkModule.NAME -> {
        RTNGiphySdkModule(reactContext)
      }

      RTNGiphyDialogModule.NAME -> {
        RTNGiphyDialogModule(reactContext)
      }

      RTNGiphyVideoManager.NAME -> {
        RTNGiphyVideoManager(reactContext)
      }

      else -> {
        null
      }
    }
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    val viewManagers: MutableList<ViewManager<*, *>> = ArrayList()
    viewManagers.add(RTNGiphyMediaViewManager())
    viewManagers.add(RTNGiphyVideoViewManager())
    return viewManagers
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      val isTurboModule: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      moduleInfos[RTNGiphySdkModule.NAME] = ReactModuleInfo(
        RTNGiphySdkModule.NAME,
        RTNGiphySdkModule.NAME,
        false,
        false,
        true,
        false,
        isTurboModule
      )
      moduleInfos[RTNGiphyDialogModule.NAME] = ReactModuleInfo(
        RTNGiphyDialogModule.NAME,
        RTNGiphyDialogModule.NAME,
        false,
        false,
        true,
        false,
        isTurboModule
      )
      moduleInfos[RTNGiphyVideoManager.NAME] = ReactModuleInfo(
        RTNGiphyVideoManager.NAME,
        RTNGiphyVideoManager.NAME,
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
