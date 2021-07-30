package com.giphyreactnativesdk.utils

import android.content.Context
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import kotlin.reflect.KProperty

class RNSDKInfo (val context: Context){
  val name = "RNSDK"

  val version: String
    get() {
      var packageInfo: PackageInfo? = null
      try {
        packageInfo = context.packageManager.getPackageInfo(context.packageName, 0)
      } catch (e: PackageManager.NameNotFoundException) {
        e.printStackTrace();
      }

      return packageInfo?.versionName.toString()
    }
}

