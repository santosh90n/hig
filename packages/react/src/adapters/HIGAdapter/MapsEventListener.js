/* eslint-disable react/no-unused-prop-types */
import { Component } from "react";
import PropTypes from "prop-types";
import throwIfNoHIGMethod from "./throwIfNoHIGMethod";
import HIGPropTypes from "./HIGPropTypes";

export default class MapsEventlistener extends Component {
  static propTypes = {
    listener: PropTypes.string.isRequired,
    handler: PropTypes.func,
    mounted: PropTypes.bool.isRequired,
    higInstance: HIGPropTypes.higInstance
  };

  static defaultProps = {
    handler: undefined,
    higInstance: undefined
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.configureHandler(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.configureHandler(nextProps);
  }

  componentWillUnmount() {
    if (this.state.dispose) {
      this.state.dispose();
    }
  }

  configureHandler(props) {
    if (!props.mounted) {
      return;
    }

    if (this.state.dispose) {
      this.state.dispose();
    }

    if (!props.handler) {
      return;
    }

    throwIfNoHIGMethod(this.props, this.props.listener);
    this.setState({
      dispose: props.higInstance[props.listener](props.handler)
    });
  }

  render() {
    return null;
  }
}
/* eslint-enable react/no-unused-prop-types */
