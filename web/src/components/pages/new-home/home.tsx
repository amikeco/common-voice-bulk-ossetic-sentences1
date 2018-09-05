import { Localized } from 'fluent-react';
import * as React from 'react';
import { ContributableLocaleLock } from '../../locale-helpers';
import { RecordLink } from '../../primary-buttons/primary-buttons';
import RequestLanguageModal from '../../request-language-modal/request-language-modal';
import Hero from './hero';
import { ClipsStats, VoiceStats } from './stats';

import './home.css';

type HeroType = 'speak' | 'listen';

type State = {
  activeHero: null | HeroType;
  showRequestLanguageModal: boolean;
  showWallOfText: boolean;
};

export default class HomePage extends React.Component<{}, State> {
  state: State = {
    activeHero: null,
    showRequestLanguageModal: false,
    showWallOfText: false,
  };

  showHandlerFor = (hero: HeroType) => () =>
    this.setState({ activeHero: hero });
  hideHandlerFor = (hero: HeroType) => () =>
    this.setState(({ activeHero }) => ({
      activeHero: activeHero === hero ? null : activeHero,
    }));

  render() {
    const { activeHero, showRequestLanguageModal, showWallOfText } = this.state;
    return (
      <div className="home">
        <ContributableLocaleLock
          render={({ isContributable }: any) =>
            isContributable ? (
              <div className="heroes">
                {['speak', 'listen'].map((type: HeroType) => (
                  <Hero
                    key={type}
                    type={type}
                    status={
                      activeHero === type
                        ? 'active'
                        : activeHero ? 'compressed' : null
                    }
                    onShow={this.showHandlerFor(type)}
                    onHide={this.hideHandlerFor(type)}
                  />
                ))}
              </div>
            ) : (
              <div className="non-contributable-hero">
                <img className="fading" src="/img/fading.svg" alt="Fading" />
                <img
                  className="waves"
                  src="/img/home-waves/speak.svg"
                  alt="Waves"
                />
              </div>
            )
          }
        />

        <div className="text">
          <div className="inner">
            <div className="title">
              <Localized id="home-title">
                <h1 />
              </Localized>
            </div>

            <div className="description">
              <Localized id="wall-of-text-first">
                <p />
              </Localized>

              <br />

              <Localized id="wall-of-text-second">
                <p />
              </Localized>

              <br />

              {showWallOfText && (
                <React.Fragment>
                  <Localized id="wall-of-text-more-desktop" lineBreak={<br />}>
                    <p />
                  </Localized>
                  <br />
                </React.Fragment>
              )}

              <Localized
                id={
                  showWallOfText ? 'languages-show-less' : 'show-wall-of-text'
                }>
                <button
                  className="show-more"
                  type="button"
                  onClick={() =>
                    this.setState({ showWallOfText: !showWallOfText })
                  }
                />
              </Localized>
            </div>
          </div>
        </div>

        <div className="stats">
          <ClipsStats.Root />
          <VoiceStats.Root />
        </div>

        <div className="mars">
          <img src="/img/mars.svg" alt="Mars" />
          <div className="cta">
            <ContributableLocaleLock
              render={({ isContributable }: any) =>
                isContributable ? (
                  <React.Fragment>
                    <RecordLink />
                    <Localized id="ready-to-record">
                      <h1 />
                    </Localized>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Localized id="request-language-text">
                      <h1 />
                    </Localized>
                    <div style={{ width: '100%' }} />
                    <Localized id="request-language-button">
                      <button
                        type="button"
                        className="request-language"
                        onClick={() =>
                          this.setState({ showRequestLanguageModal: true })
                        }
                      />
                    </Localized>
                    {showRequestLanguageModal && (
                      <RequestLanguageModal
                        onRequestClose={() =>
                          this.setState({ showRequestLanguageModal: false })
                        }
                      />
                    )}
                  </React.Fragment>
                )
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
