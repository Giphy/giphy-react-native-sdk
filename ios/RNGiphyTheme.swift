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

public class RNGiphyTheme: GPHTheme {
  var config: NSDictionary

  public init(rnConfig: NSDictionary?) {
    config = deserializeRNConfig(rnConfig)
    super.init()
    type = config["preset"] as? GPHThemeType ?? .dark
  }

  // MARK: - Dialog's Handle
  public override var handleBarColor: UIColor {
    config["handleBarColor"] as? UIColor ?? super.handleBarColor
  }

  // MARK: - Emoji Drawer
  public override var emojiDrawerScrollIndicatorStyle: UIScrollView.IndicatorStyle {
    config["emojiDrawerScrollIndicatorStyle"] as? UIScrollView.IndicatorStyle ?? super.emojiDrawerScrollIndicatorStyle
  }

  public override var emojiDrawerGradientTopColor: UIColor {
    config["emojiDrawerGradientTopColor"] as? UIColor ?? super.emojiDrawerGradientTopColor
  }

  public override var emojiDrawerGradientBottomColor: UIColor {
    config["emojiDrawerGradientBottomColor"] as? UIColor ?? super.emojiDrawerGradientBottomColor
  }

  public override var emojiDrawerSeparatorColor: UIColor {
    config["emojiDrawerSeparatorColor"] as? UIColor ?? super.emojiDrawerSeparatorColor
  }

  // MARK: - Search Bar
  public override var searchBackButtonColor: UIColor {
    config["searchBackButtonColor"] as? UIColor ?? super.searchBackButtonColor
  }

  public override var searchPlaceholderTextColor: UIColor {
    config["searchPlaceholderTextColor"] as? UIColor ?? super.searchPlaceholderTextColor
  }

  public override var searchTextColor: UIColor {
    config["searchTextColor"] as? UIColor ?? super.searchTextColor
  }

  public override var searchBarBackgroundColor: UIColor {
    config["searchBarBackgroundColor"] as? UIColor ?? super.searchBarBackgroundColor
  }

  public override var searchBarPadding: CGFloat {
    config["searchBarPadding"] as? CGFloat ?? super.searchBarPadding
  }

  public override var searchBarCornerRadius: CGFloat {
    config["searchBarCornerRadius"] as? CGFloat ?? super.searchBarCornerRadius
  }

  // MARK: - Suggestions
  public override var showSuggestionsBar: Bool {
    config["showSuggestionsBar"] as? Bool ?? super.showSuggestionsBar
  }

  public override var suggestionCellBackgroundColor: UIColor {
    config["suggestionCellBackgroundColor"] as? UIColor ?? super.suggestionCellBackgroundColor
  }

  public override var suggestionCellTextColor: UIColor {
    config["suggestionCellTextColor"] as? UIColor ?? super.suggestionCellTextColor
  }

  // MARK: - Tab Bar
  public override var tabBarSwitchSelectedColor: UIColor {
    config["tabBarSwitchSelectedColor"] as? UIColor ?? super.tabBarSwitchSelectedColor
  }

  public override var tabBarSwitchDefaultColor: UIColor? {
    config["tabBarSwitchDefaultColor"] as? UIColor ?? super.tabBarSwitchDefaultColor
  }

  public override var tabBarBackgroundAlpha: CGFloat {
    config["tabBarBackgroundAlpha"] as? CGFloat ?? super.tabBarBackgroundAlpha
  }

  // MARK: - Confirmation
  public override var confirmationSelectButtonColor: UIColor {
    config["confirmationSelectButtonColor"] as? UIColor ?? super.confirmationSelectButtonColor
  }

  public override var confirmationSelectButtonTextColor: UIColor {
    config["confirmationSelectButtonTextColor"] as? UIColor ?? super.confirmationSelectButtonTextColor
  }

  public override var usernameColor: UIColor {
    config["usernameColor"] as? UIColor ?? super.usernameColor
  }

  public override var confirmationBackButtonColor: UIColor {
    config["confirmationBackButtonColor"] as? UIColor ?? super.confirmationBackButtonColor
  }

  public override var confirmationViewOnGiphyColor: UIColor {
    config["confirmationViewOnGiphyColor"] as? UIColor ?? super.confirmationViewOnGiphyColor
  }

  public override var avatarPlaceholderColor: UIColor {
    config["avatarPlaceholderColor"] as? UIColor ?? super.avatarPlaceholderColor
  }

  // MARK: - Grid Content
  public override var cellCornerRadius: CGFloat {
    config["cellCornerRadius"] as? CGFloat ?? super.cellCornerRadius
  }

  public override var stickerBackgroundColor: UIColor {
    config["stickerBackgroundColor"] as? UIColor ?? super.stickerBackgroundColor
  }

  public override var fixedSizeCells: Bool {
    config["fixedSizeCells"] as? Bool ?? super.fixedSizeCells
  }

  public override var backgroundColorForLoadingCells: UIColor {
    config["backgroundColorForLoadingCells"] as? UIColor ?? super.backgroundColorForLoadingCells
  }

  // MARK: - Keyboard
  public override var keyboardAppearance: UIKeyboardAppearance {
    config["keyboardAppearance"] as? UIKeyboardAppearance ?? super.keyboardAppearance
  }

  // MARK: - Other
  public override var backgroundColor: UIColor {
    config["backgroundColor"] as? UIColor ?? super.backgroundColor
  }
}
