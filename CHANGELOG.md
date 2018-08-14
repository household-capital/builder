## [Unreleased]
<details>
  <summary>
    Changes that are not yet released.
    Click to see more.
  </summary>

</details>

## ver 2.10 - 09.08.2018
* Update: Page layout options updated to choose between boxed and stretched for all layouts
* Fix: Theme editor width works properly
* Fix: Checkbox attribute has proper styling
* Fix: Loading spinner displayed on template save
* Fix: Sticky option related to parent works properly with correct height calculations
* Fix: CSS animations work properly on IE11
* Fix: Header, Footer, Sidebar selector remembers state
* Fix: Element 'Hide' toggle is synchronized with the Tree View
* Fix: Slick slider library initialize properly within Pageable Container element

## ver 2.9 - 26.06.2018
* New: Row layout responsive settings to control column width and appearance on various devices
* New: Compatibility with wpDataTables plugin added
* New: Option to display sticky elements only when they become sticky
* Fix: Design Options values apply properly within Global Templates
* Fix: Custom element name apply properly for element controls
* Fix: Element hide option synchronised with the Tree view

## ver 2.8 - 18.06.2018
* New: Sticky row, column, and section option allows to fix on upon scroll and scroll the next row on top of it
* New: Compatibility with Caldera Forms plugin added
* New: API hooks added as a part of API implementation stage
* New: Ukrainian language po/mo files added to the plugin
* Update: Option to disable element and template image preview image and description
* Update: Global elements .css file is optimized for performance
* Fix: Woo Commerce page edit with Visual Composer
* Fix: Headers, Footers, and Sidebars can be used in Woo Commerce pages
* Fix: Design Options applies to proper tag within Section element
* Fix: Visual Composer works properly on Pantheon hosting

## ver 2.7 - 27.05.2018
* New: Import/Export Hub add-on for Visual Composer Premium to migrate templates between sites
* New: Template Widget Hub add-on for Visual Composer Premium template display in sidebar
* New: Button and Icon group elements to display buttons and icons inline
* New: Remove All options is added to the Tree view to delete all content with one click
* Update: Free and Premium sorting options in the Visual Composer Hub
* Update: Tree View interface optimized for multi-level layouts
* Update: Element dependancy mechanism enhanced to support element groups and inner elements
* Update: Option to remove header, footer, and sidebar for the Visual Composer page layouts
* Fix: Custom CSS styles applied properly for stretched button in advanced content elements
* Fix: Default video shortcode works in templates
* Fix: wp_remote_get function works properly in older WordPress versions
* Fix: Visibility toggle in Design Options display proper state
* Fix: Element animation in Design Options works for custom devices
* Fix: Undo removes whole element set of row, column, and element if they were added with one action
* Fix: Empty space element works properly on custom devices
* Fix: Post grid elements displayed properly on the home page
* Fix: Featured Image Post Grid element properly applies text and category colors
* Fix: Logo Slider element works properly with RTL

## ver 2.6.1 - 22.05.2018
* Fix: Tabs displayed properly in IE11
* Fix: Global templates element compatibility with the latest version
* Fix: Image gallery and Image masonry gallery downloaded with the template from the Hub
* Fix: WooCommerce compatibility improvements

## ver 2.6 - 21.05.2018
* New: Gutenberg element allows to insert Gutenberg editor blocks within Visual Composer layout
* New: Compatibility with Gutenberg editor introduced
* New: Option to disable Gutenberg editor via Visual Composer Settings
* Update: Header, Footer, and Sidebar Hub templates are displayed in Global Templates section
* Update: User Experience (UX) for Visual Composer editor via mobile devices improved
* Fix: Multiple posts selected in link selector with WPML
* Fix: Full height Row works properly in Global Templates

## ver 2.5 - 10.05.2018
* New: Rows can be copied and pasted after row, on blank pages, and into other rows
* New: Columns can be copied and pasted in rows
* New: Visual Composer Hub templates can be modified via Global Templates and creates a new copy of the template
* Update: Option to skip automatic post update after plugin update in case of an error
* Fix: Woocommerce Cart tab is compatible with Visual Composer
* Fix: Default shortcode values for Woo Commerce works properly
* Fix: Max width added to the Single Image element wrapper for IE browser compatibility
* Fix: Initial children settings moved to settings.json

## ver 2.4 - 24.04.2018
* New: Global Templates addon added to allow manage multiple instances of template from a single place
* New: New category 'Addons' added to the Visual Composer Hub
* Update: Post Grid elements instantly receive WordPress data after download from the Visual Composer Hub
* Update: Amount of editable objects debounced to improve performance of TinyMCE
* Update: Image Collage element size parameters updated with percentage helper
* Update: Template name and save mechanism updated for better performance
* Fix: Single Image element cropping adapted for Large size images
* Fix: Single Image element canvas resize apply correctly
* Fix: Synchronous transition on button hover effects for smooth animation
* Fix: Basic button custom hover colors apply correctly
* Fix: Header, Footer, and Sidebar template styles not overwritten by content styles
* Fix: Basic menu in Header templates displayed properly
* Fix: Device section of Design Options works properly on edit window resize
* Fix: Shape Divider apply to bottom correctly on FireFox
* Fix: Featured Image Post Grid image apply properly

## ver 2.3 - 05.04.2018
* Update: Single Image Element rebuilt for performance
* Update: Edit form inputs optimized in size for better usability
* Improve: Add, Move, and Clone operations improved for performance
* Fix: Post Grid Element Categories
* Fix: Shape divider is not affected by Balance tag from various themes
* Fix: Featured Image and Title are visible in FireFox
* Fix: Cross browser scripting errors removed
* Fix: Shape divider background color applied properly
* Fix: WPML compatibility improvements for language URL format
* Fix: URLs replaced on plugin reset option
* Fix: Show/Hide element toggle works properly
* Fix: Radius in Design Options applied to columns
* Fix: Row layout display for Edge 16
* Fix: Disable Title toggle switch displayed properly

## ver 2.2.1 - 23.03.2018
* Fix: Source css files doesn't enqueue
* Fix: Contributor role is allowed to create templates for Header, Footer, and Sidebar
* Fix: Post Grid titles don't have clickable links

## ver 2.2 - 22.03.2018
* Update: Add New with Visual Composer added to the navigation bar
* Update: Assets in multisite network are now independent
* Update: Reset option in Settings extended to auto-configure site path after migration
* Update: Assets are downloaded to Uploads folder to resolve permission issues
* Update: Performance improvements by caching editor controls
* Update: Re-render only related elements on update for better performance
* Fix: Visual Composer templates affect archive page
* Fix: Page title modifications affect page title display in menu
* Fix: Radius for columns in Design Options assigned to wrong wrapper

## ver 2.1 - 19.03.2018
* Update: Editor loading happens on post_content rendering to improve compatibility with themes
* Fix: Custom link selector search returns all results without number limits
* Fix: Theme template dropdown display chosen template in page layout settings
* Fix: Environment variable fixed for PHP version 5.2
* Fix: \<p> tag is not stripped out when saving page in WordPress admin editor
* Fix: Single Image resize mechanism accept custom values
* Fix: Proper activation link generated for custom PHP versions
* Fix: Header, Footer, and Sidebar templates are not displayed in page search results
* Fix: 'Add New with Visual Composer' button is available in WordPress in different language
* Fix: Invalid argument fix for Subscriber in Header, Footer, and Sidebar editor.
* Fix: Custom widget element update works properly
* Fix: Metabox output performed before HTML
* Fix: Disabling page title in the editor does not affect menu title

## ver 2.0 - 02.03.2018
* Update now and check new content elements in the Hub.
* New: Page layout selector to select from Visual Composer defined layouts or theme layout
* New: Header, Footer, and Sidebar editor to create fully custom website
* New: Header, Footer, and Sidebar templates added to the Visual Composer Hub
* New: Instantly replace any content element from the same category with Replace Element option
* New: Compatibility with Slider Revolution, Gravity Forms, Ninja Forms, Layer Slider, Essential Grid, EventsOn Calendar, WP
* Forms, NextGen Gallery, Envira Gallery, MailChimp for WP, and AddtoAny Share Buttons added
* New: Compatibility with Advanced Custom Fields (ACF) added to display custom fields on your page
* Update: Save button removed from Settings for instant changes
* Update: Elements and Templates can be added with 'Enter' button
* Update: Row stretch works with CSS when using Visual Composer page layouts
* Fix: WordPress revisions are compatible with Visual Composer
* Fix: Outline button borders of normal state not visible on hover
* Fix: Wrong response data fixed on editor loading

## ver 1.14 - 09.02.2018
* Update now and check new content elements in the Hub.
* Update: Coding standard updates for better compatibility with WPEngine;
* Update: Minimized package size for save content operations to increase performance;
* Update: Exclude option for attributes added to control attribute list for inner elements;
* Fix: Wrong image data URL in templates downloaded from the Visual Composer Hub;
* Fix: Editor loading issue for body without classes;

## ver 1.13.1 - 01.02.2018
* Update now and check new content elements in the Hub.
* New: Video Player - add self-hosted video from Media Library to your website and control 'Play' icon design
* New: Typewriter Heading - add interactive heading with typewriter animation to drag your customer attention to specific title or keyword
* Fix: Changed post access check in Post grid
* Fix: Javascript error in tree view which was fired in certain scenarios
* Fix: Background zoom effect in Design Options
* Fix: WPML integration improvements for Design Options

## ver 1.13 - 18.01.2018
* Update now and check new content elements in the Hub.
* New: Featured Image Post Grid - show your portfolio to the whole world in a beautiful way
* New: Centered Post Grid - classic layout to which is perfect for blog archives, news sections, and other structured content
* New: Multiple Image Collage - an attention grabber media element. Showcase your products with style
* New: Recent colors in color picker. Noone wants to open a brand book every time to look for #HEX color. Now your colors are saved in the recent color section and are just a click away
* Update: WooCommerce integration is a must and we improved integration between the two plugins in this release
* Update: License activation is better handling specific server configurations
* Update: Notification system received a facelift and now system messages look better than ever
* Fix: In some cases, CSS animation was fired two times instead of one

## ver 1.12 - 12.01.2018
* New: Added Backend editor represented for accordion style elements;
* Update: Element controls code has been updated for performance;
* Update: Visual Composer Hub window alignment for Safari improved;
* Fix: Drag and Drop elements in tree;
* Fix: Post Grid type element display for not logged in users are visible;
* Fix: Custom device values in Design Options for separate devices accepted;
* Fix: Blank Page proper save if the page is added via 'Create a blank page';
* Fix: Custom template placeholder image generation;
* Fix: Template saving error message display;

## ver 1.11 - 04.01.2018
* New: Sorting for Visual Composer Hub allows to switch between elements and templates;
* New: Photoswipe lightbox option added to image elements as an alternative to default lightbox;
* New: Option to disable row/column stacking on mobile for a specific row;
* New: Add Instagram style filters to your images with one click;
* Update: Update of React JS version up to the latest release;
* Fix: Vimeo video scale improved to support full width in Firefox browser;
* Fix: Compatibility with the latest Yoast SEO premium version;

## ver 1.10 - 27.12.2017
* New: Premium users can set category of their site so Visual Composer can focus on your industry
* New: Create blank page template with boxed content by using Visual Composer page settings
* New: Parallax effect that reacts on mouse movement added to Design Options of row and column
* New: Show/Hide element for all devices has been introduced in Design Options
* Update: Google Heading element offers whole set of Google Fonts to choose from
* Update: Template bundle has been divided into separate bundles for each template
* Update: Error report mechanism allows adding comments to specify issues
* Fix: Faq toggle element glitch removed on resize
* Fix: Bundle size has been optimized for proper download

## ver 1.9 - 18.12.2017
* Added: Upgrade to Visual Composer Premium
* Added: Templates in Visual Composer Hub (elements for templates are downloaded automatically with template)
* Update: Option to submit error automatically if activation failed
* Update: Google Heading display on instant edit improved
* Update: Optimize JS and CSS enqueue for better performance
* Update: Downloaded elements get auto-updated if new version is available
* Update: Visual Composer automatically update layout after changes in layout Settings
* Update: Smart JS loading logic - enqueue only used assets
* Update: Border radius can be applied to YouTube and Vimeo videos
* Update: Error message enhancement
* Update: System requirements check added before activation process
* Fix: YouTube background video display
* Fix: Local CSS saving after page update
* Fix: RTL display in Tree View mode
* Fix: Border radius available for background images
* Fix: Autocomplete, auto-indent, and highlight syntax option in ACE editor
* Fix: Form links are disabled on Frontend editor
* Fix: Icon picker ReactJS error on search
* Fix: Undo must refresh row layout
* Fix: Work with revisions on post saving
* Fix: Bottom margin for Separators
* Fix: Lightbox class has been changed to less generic
* Fix: Custom CSS override default styles
* Fix: Image gallery custom links applied correctly
* Fix: Element controls fixed in Safari
* Fix: Backend editor display in Edge
* Fix: Revolution Slider render in Frontend editor
* Fix: Ninja Forms render in Frontend editor

## ver 1.8 - 01.11.2017
* New: Edit your Visual Composer content from any mobile device with new UI/UX for Mobile Editing
* New: Add video from YouTube or Vimeo as a background to your row shape dividers with simple URL copy/paste
* New: Add custom Javascript to your page and site directly from Visual Composer Settings
* New: Control your layout templates directly from Visual Composer Settings. Remove header, footer, and sidebar with a single click
* Update: Tree View window now opens as a separate window for better visibility

## ver 1.7 - 24.10.2017
* New: Shape design update in divider
* New: Shape divider bottom option for row
* New: Post update mechanism for element updates
* Update: Shape divider scale mechanism
* Update: Shape divider sections in element window
* Update: CSS loading on Frontend editor
* Fix: New attributes added to existing elements

## ver 1.6 - 16.10.2017
* New: Blank page option in Backend Page Attributes
* Update: Size attribute for Basic and Outline button
* Update: JS enqueue in Frontend editor
* Update: Delay for element controls
* Update: Icon color attribute for Message Box element
* Fix: Paragraph bottom-margin for elements
* Fix: Activation process improvements

## ver 1.5 - 09.10.2017
* Added: Recycle bin to delete elements with drag and drop
* Added: Tel attribute for link selector
* Added: Premium element teaser section
* Update: Drag and Drop helper line animation
* Update: Shape divider self-hosted video background
* Fix: Image position in Design Options for predefined templates added
* Fix: Faq Toggle element position

## ver 1.4 - 29.09.2017
* Added: Row and column shape divider with colors and images
* Added: Keyboard shortcuts for basic operations
* Added: Background image Zoom In/Out effects in Design Options
* Added: Carousel slideshow effect for background image in Design Options
* Update: Reverse parallax effect added to Design Options
* Update: Single image markup and caption output
* Fixed: Design Options values in Backend editor
* Fixed: Faq toggle icons display position on Chrome
* Fixed: Design Options placeholder display on Edge
* Fixed: Backend editor loading on FireFox
* Fixed: Feature section left padding removed
* Fixed: Tree view scroll to top removed

## ver 1.3 - 08.09.2017
* Added: Image position attribute in Design Options
* Added: Image position attribute for Hero Section
* Added: Range control attribute in Separator
* Added: Factory reset option in Settings
* Update: New icon libraries
* Update: Extension download in editor on update

## ver 1.2 - 31.08.2017
* New: copy/paste elements across columns
* New: option to name elements with custom titles
* New: temporary hide elements with ‘eye’ control
* Update: settings and custom css window user interface
* Update: Faq Toggle element rename

## ver 1.1.1 - 18.08.2017
* Update: German translation. Credits to Hajo Hagelstein.
* Fix: error on activation
* Fix: file caching issues

## ver 1.1 - 17.08.2017
* New: attribute for content elements with icons and text
* New: changelog with native WordPress design
* Update: improved edit form design (reduced spaces and font size)
* Update: plugin activation process
* Update: extension bundle split download
* Fix: global CSS duplication