/* global React, vcvAPI */
/*eslint no-unused-vars: 0*/
class Component extends vcvAPI.elementComponent {
  validateSize (value) {
    let units = [ 'px', 'em', 'rem', '%', 'vw', 'vh' ]
    let re = new RegExp('^-?\\d*(\\.\\d{0,9})?(' + units.join('|') + ')?$')
    if (value === '' || value.match(re)) {
      return value
    } else {
      return null
    }
  }

  getFontVariant (variant) {
    let number = variant.match(/\d+/g)
    let word = variant.match(/[a-z]+$/i)
    let fontWeight = number ? number[ 0 ] : '400'
    let fontStyle = word && word[ 0 ] === 'italic' ? 'italic' : ''
    return { weight: fontWeight, style: fontStyle }
  }

  render () {
    let { id, atts, editor } = this.props
    let { designOptions, text, font, elementTag, fontSize, alignment, lineHeight, link, customClass } = atts
    let classes = 'vce-google-fonts-heading vce'
    let customProps = {}
    let innerClasses = 'vce-google-fonts-heading-inner'
    let innerCustomProps = {}
    innerCustomProps.style = {}
    let CustomTag = elementTag
    let headingHtml = text
    let googleFontLink = ''

    if (link && link.url) {
      let { url, title, targetBlank, relNofollow } = link
      let linkProps = {
        'href': url,
        'title': title,
        'target': targetBlank ? '_blank' : undefined,
        'rel': relNofollow ? 'nofollow' : undefined
      }

      headingHtml = (
        <a className='vce-google-fonts-heading-link' {...linkProps}>
          {headingHtml}
        </a>
      )
    }

    if (typeof customClass === 'string' && customClass) {
      classes += ' ' + customClass
    }

    if (fontSize) {
      fontSize = this.validateSize(fontSize)

      if (fontSize) {
        fontSize = /^\d+$/.test(fontSize) ? fontSize + 'px' : fontSize
        innerCustomProps.style.fontSize = fontSize
      }
    }

    if (lineHeight) {
      lineHeight = this.validateSize(lineHeight)

      if (lineHeight) {
        lineHeight = /^\d+$/.test(lineHeight) ? lineHeight + 'px' : lineHeight
        innerCustomProps.style.lineHeight = lineHeight
      }
    }

    if (alignment) {
      classes += ` vce-google-fonts-heading--align-${alignment}`
    }

    let mixinData = this.getMixinData('textColor')

    if (mixinData) {
      classes += ` vce-google-fonts-heading--color-${mixinData.selector}`
    }

    if (font) {
      let fontHref = `https://fonts.googleapis.com/css?family=${font.fontFamily}:${font.fontStyle}`
      googleFontLink = (
        <link href={fontHref} rel='stylesheet' />
      )

      innerCustomProps.style.fontFamily = font.fontFamily
      innerCustomProps.style.fontWeight = this.getFontVariant(font.fontStyle).weight
      innerCustomProps.style.fontStyle = this.getFontVariant(font.fontStyle).style
    }

    let devices = designOptions.visibleDevices ? Object.keys(designOptions.visibleDevices) : []
    let animations = []
    devices.forEach((device) => {
      let prefix = designOptions.visibleDevices[ device ]
      if (designOptions[ device ].animation) {
        if (prefix) {
          prefix = `-${prefix}`
        }
        animations.push(`vce-o-animate--${designOptions[ device ].animation}${prefix}`)
      }
    })
    if (animations.length) {
      customProps[ 'data-vce-animate' ] = animations.join(' ')
    }

    return <div {...customProps} className={classes} id={'el-' + id} {...editor}>
      {googleFontLink}
      <CustomTag className={innerClasses} {...innerCustomProps}>
        {headingHtml}
      </CustomTag>
    </div>
  }
}
