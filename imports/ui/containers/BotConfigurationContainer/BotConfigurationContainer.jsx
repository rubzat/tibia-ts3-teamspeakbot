import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Bots } from '/imports/api/bots/Bots';
import { ServerQueryUsers } from '/imports/api/bots/ServerQueryUsers';
import BotConfigurationContainerStep0 from '/imports/ui/containers/BotConfigurationContainer/BotConfigurationContainerStep0';
import BotConfigurationContainerStep1 from '/imports/ui/containers/BotConfigurationContainer/BotConfigurationContainerStep1';

const calculateStepByData = ({ queryUser }) => {
  let step = 0;
  if (!queryUser) step = 1;
  return step;
};

const containersByStep = {
  0: BotConfigurationContainerStep0,
  1: BotConfigurationContainerStep1,
};

let BotConfigurationContainer = ({ bot, botReady, queryUser }) => {
  const { _id } = bot;
  const step = calculateStepByData({ queryUser });
  const ContainerStep = containersByStep[step];

  return (
    <div>
      {
        botReady ?
          <ContainerStep _id={_id} /> :
          ''
      }
    </div>
  );
};

BotConfigurationContainer.defaultProps = {
  bot: {},
  botReady: false,
  queryUser: {},
};

/* eslint-disable react/no-unused-prop-types */
BotConfigurationContainer.propTypes = {
  _id: PropTypes.string.isRequired,
  bot: PropTypes.object,
  botReady: PropTypes.bool,
  queryUser: PropTypes.object,
};

BotConfigurationContainer = createContainer(({ _id }) => {
  const botsHandle = Meteor.subscribe('bot.get', { _id });
  const queryUserHandle = Meteor.subscribe('queryUser.get', { botId: _id });

  return {
    bot: Bots.findOne({ _id }),
    botReady: botsHandle.ready(),
    queryUser: ServerQueryUsers.findOne({ botId: _id }),
    queryUserReady: queryUserHandle.ready(),
  };
}, BotConfigurationContainer);

export default BotConfigurationContainer;
