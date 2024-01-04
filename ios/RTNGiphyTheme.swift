import UIKit

import GiphyUISDK

let THEME_COLOR_FIELDS = [
  "avatarPlaceholderColor",
  "backgroundColor",
  "backgroundColorForLoadingCells",
  "confirmationBackButtonColor",
  "confirmationSelectButtonColor",
  "confirmationSelectButtonTextColor",
  "confirmationViewOnGiphyColor",
  "defaultTextColor",
  "dialogOverlayBackgroundColor",
  "emojiDrawerGradientBottomColor",
  "emojiDrawerGradientTopColor",
  "emojiDrawerSeparatorColor",
  "handleBarColor",
  "retryButtonBackgroundColor",
  "retryButtonTextColor",
  "searchBackButtonColor",
  "searchBarBackgroundColor",
  "searchPlaceholderTextColor",
  "searchTextColor",
  "stickerBackgroundColor",
  "suggestionCellBackgroundColor",
  "suggestionCellTextColor",
  "tabBarSwitchDefaultColor",
  "tabBarSwitchSelectedColor",
  "usernameColor",
]

private func deserializeRNConfig(_ rawConfig: NSDictionary?) -> NSDictionary {
  let config = NSMutableDictionary(dictionary: rawConfig ?? [:])

  if let preset = config["preset"] as? String {
    config["preset"] = GPHThemeType.fromRNValue(preset)
  }
  if let kbAppearance = config["keyboardAppearance"] as? String {
    config["keyboardAppearance"] = UIKeyboardAppearance.fromRNValue(kbAppearance)
  }
  if let edScrollIndicatorStyle = config["emojiDrawerScrollIndicatorStyle"] as? String {
    config["emojiDrawerScrollIndicatorStyle"] = UIScrollView.IndicatorStyle.fromRNValue(edScrollIndicatorStyle)
  }

  THEME_COLOR_FIELDS.forEach { field in
    if config[field] != nil {
      config[field] = RCTConvert.uiColor(config[field])
    }
  }

  return config
}

class RTNGiphyTheme: GPHTheme {
  var config: NSDictionary

  init(rnConfig: NSDictionary?) {
    config = deserializeRNConfig(rnConfig)
    super.init()
    type = config["preset"] as? GPHThemeType ?? .light
  }

  // MARK: - Dialog's Handle
  override var handleBarColor: UIColor {
    config["handleBarColor"] as? UIColor ?? super.handleBarColor
  }

  // MARK: - Emoji Drawer
  override var emojiDrawerScrollIndicatorStyle: UIScrollView.IndicatorStyle {
    config["emojiDrawerScrollIndicatorStyle"] as? UIScrollView.IndicatorStyle ?? super.emojiDrawerScrollIndicatorStyle
  }

  override var emojiDrawerGradientTopColor: UIColor {
    config["emojiDrawerGradientTopColor"] as? UIColor ?? super.emojiDrawerGradientTopColor
  }

  override var emojiDrawerGradientBottomColor: UIColor {
    config["emojiDrawerGradientBottomColor"] as? UIColor ?? super.emojiDrawerGradientBottomColor
  }

  override var emojiDrawerSeparatorColor: UIColor {
    config["emojiDrawerSeparatorColor"] as? UIColor ?? super.emojiDrawerSeparatorColor
  }

  // MARK: - Search Bar
  override var searchBackButtonColor: UIColor {
    config["searchBackButtonColor"] as? UIColor ?? super.searchBackButtonColor
  }

  override var searchPlaceholderTextColor: UIColor {
    config["searchPlaceholderTextColor"] as? UIColor ?? super.searchPlaceholderTextColor
  }

  override var searchTextColor: UIColor {
    config["searchTextColor"] as? UIColor ?? super.searchTextColor
  }

  override var searchBarBackgroundColor: UIColor {
    config["searchBarBackgroundColor"] as? UIColor ?? super.searchBarBackgroundColor
  }

  override var searchBarPadding: CGFloat {
    config["searchBarPadding"] as? CGFloat ?? super.searchBarPadding
  }

  override var searchBarCornerRadius: CGFloat {
    config["searchBarCornerRadius"] as? CGFloat ?? super.searchBarCornerRadius
  }

  // MARK: - Suggestions
  override var showSuggestionsBar: Bool {
    config["showSuggestionsBar"] as? Bool ?? super.showSuggestionsBar
  }

  override var suggestionCellBackgroundColor: UIColor {
    config["suggestionCellBackgroundColor"] as? UIColor ?? super.suggestionCellBackgroundColor
  }

  override var suggestionCellTextColor: UIColor {
    config["suggestionCellTextColor"] as? UIColor ?? super.suggestionCellTextColor
  }

  // MARK: - Tab Bar
  override var tabBarSwitchSelectedColor: UIColor {
    config["tabBarSwitchSelectedColor"] as? UIColor ?? super.tabBarSwitchSelectedColor
  }

  override var tabBarSwitchDefaultColor: UIColor? {
    config["tabBarSwitchDefaultColor"] as? UIColor ?? super.tabBarSwitchDefaultColor
  }

  override var tabBarBackgroundAlpha: CGFloat {
    config["tabBarBackgroundAlpha"] as? CGFloat ?? super.tabBarBackgroundAlpha
  }

  // MARK: - Confirmation
  override var confirmationSelectButtonColor: UIColor {
    config["confirmationSelectButtonColor"] as? UIColor ?? super.confirmationSelectButtonColor
  }

  override var confirmationSelectButtonTextColor: UIColor {
    config["confirmationSelectButtonTextColor"] as? UIColor ?? super.confirmationSelectButtonTextColor
  }

  override var usernameColor: UIColor {
    config["usernameColor"] as? UIColor ?? super.usernameColor
  }

  override var confirmationBackButtonColor: UIColor {
    config["confirmationBackButtonColor"] as? UIColor ?? super.confirmationBackButtonColor
  }

  override var confirmationViewOnGiphyColor: UIColor {
    config["confirmationViewOnGiphyColor"] as? UIColor ?? super.confirmationViewOnGiphyColor
  }

  override var avatarPlaceholderColor: UIColor {
    config["avatarPlaceholderColor"] as? UIColor ?? super.avatarPlaceholderColor
  }

  // MARK: - Grid Content
  override var cellCornerRadius: CGFloat {
    config["cellCornerRadius"] as? CGFloat ?? super.cellCornerRadius
  }

  override var stickerBackgroundColor: UIColor {
    config["stickerBackgroundColor"] as? UIColor ?? super.stickerBackgroundColor
  }

  override var fixedSizeCells: Bool {
    config["fixedSizeCells"] as? Bool ?? super.fixedSizeCells
  }

  override var backgroundColorForLoadingCells: UIColor {
    config["backgroundColorForLoadingCells"] as? UIColor ?? super.backgroundColorForLoadingCells
  }

  // MARK: - Keyboard
  override var keyboardAppearance: UIKeyboardAppearance {
    config["keyboardAppearance"] as? UIKeyboardAppearance ?? super.keyboardAppearance
  }

  // MARK: - Other
  override var backgroundColor: UIColor {
    config["backgroundColor"] as? UIColor ?? super.backgroundColor
  }

  override var defaultTextColor: UIColor {
    config["defaultTextColor"] as? UIColor ?? super.defaultTextColor
  }
}
