import React from 'react'

export default class SplashVideo extends React.Component {

  componentDidMount() {
    // Resive video
    this.scaleVideoContainer();

    this.initBannerVideoSize('.video-container .poster img');
    this.initBannerVideoSize('.video-container .filter');
    this.initBannerVideoSize('.video-container video');

    var self = this;
    $(window).on('resize', function() {
        self.scaleVideoContainer();
        self.scaleBannerVideoSize.bind(self, '.video-container .poster img');
        self.scaleBannerVideoSize.bind(self, '.video-container .filter');
        self.scaleBannerVideoSize.bind(self, '.video-container video');
    });
  }

  scaleVideoContainer() {

    var height = $(window).height();
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

  }

  initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    this.scaleBannerVideoSize(element);

  }

  scaleBannerVideoSize(element) {
    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        videoWidth,
        videoHeight;

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width'),
            windowAspectRatio = windowHeight/windowWidth;

        if (videoAspectRatio > windowAspectRatio) {
            videoWidth = windowWidth;
            videoHeight = videoWidth * videoAspectRatio;
            $(this).css({'top' : -(videoHeight - windowHeight) / 2 + 'px', 'margin-left' : 0});
        } else {
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
        }

        $(this).width(videoWidth).height(videoHeight);

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');
    });
  }

  render() {
    return (
      <div>
        <div id="background" className="homepage-hero-module">
            <div className="video-container">
                <div className="filter"></div>
                <video autoPlay loop className="fillWidth">
                    <source src="/media/cows.mp4" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
                    <source src="/media/cows.webm" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
                </video>
            </div>
        </div>

        <div id="herotitle" className="title-text">
            <h1>NamstR</h1>
            <p style={{'textAlign': 'right'}}>a CA&ES DO production</p>
        </div>
      </div>
    )
  }
}
