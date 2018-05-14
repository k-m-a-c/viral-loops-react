import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class ViralLoops extends Component {
  constructor(props) {
    super(props);

    this.loadCampaign = this.loadCampaign.bind(this);
    this.setupWidgets = this.setupWidgets.bind(this);
    this.renderWidgets = this.renderWidgets.bind(this);

    this.state = {
      isInternetExporer11: navigator.userAgent.indexOf('Trident/7.0') !== -1,
    }
  }

  componentDidMount() {
    this.loadCampaign();
    this.setupWidgets();
  }

  loadCampaign() {
    if (this.state.isInternetExporer11) return '';
    window.VL.load(this.props.publicToken, { autoLoadWidgets: !0 });
  }

  setupWidgets() {
    if (this.state.isInternetExporer11) return ''; 
    const campaign = window.VL.instances[this.props.publicToken];

    if (!campaign) return;
    const widgets = campaign.widgets.getAll();

    if (widgets !== undefined && widgets.length > 0) {
      widgets.map(widget => widget.show());
    }
  }

  renderWidgets() {
    if (this.state.isInternetExporer11) return '';

    const { formWidget, milestoneWidget, counterWidget } = this.props;

    return (
      <Fragment>
        { formWidget ?
          <div 
            data-vl-widget='embedForm'
            data-test='ViralLoops_formWidget'
          />
          : ''
        }

        {
          milestoneWidget ?
          <div 
            data-vl-widget='milestoneWidget'
            data-test='ViralLoops_milestoneWidget'
          />
          : ''
        }

        {
          counterWidget ?
          <div
            data-vl-widget='referralCountWidget'
            data-test='ViralLoops_counterWidget'
          />
          : ''
        }
      </Fragment>
    )
  }

  render() {
    return (
      <Fragment>
        { this.renderWidgets() }
      </Fragment>
    )
  }
}

export default ViralLoops;

ViralLoops.propTypes = {
  publicToken: PropTypes.string.isRequired,
  formWidget: PropTypes.bool,
  milestoneWidget: PropTypes.bool,
  counterWidget: PropTypes.bool,
}
