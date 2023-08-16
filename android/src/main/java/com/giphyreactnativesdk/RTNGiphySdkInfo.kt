package com.giphyreactnativesdk

import android.content.Context
import android.content.pm.PackageInfo
import android.content.pm.PackageManager

class RTNGiphySdkInfo(val context: Context) {
  val name = "RNSDK"

  val version: String
    get() {
      var packageInfo: PackageInfo? = null
      try {
        packageInfo = context.packageManager.getPackageInfo(context.packageName, 0)
      } catch (e: PackageManager.NameNotFoundException) {
        e.printStackTrace()
      }

      return packageInfo?.versionName.toString()
    }
}

