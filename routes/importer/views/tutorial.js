const { shell, header, subheader } = require('../../../views/components');
const { sidebar } = require('./components');

const tutorial = () => shell(`
  <div class="main">
    ${header({ currentPage: 'import' })}
    ${subheader({ currentPage: 'import' })}
    <div class="views">
      ${sidebar()}
      <div class="page" id="page">
        <h1>How to get your session key</h1>
        <h2>Patreon, Fanbox, SubscribeStar, Gumroad, DLsite</h2>
        <p>Kemono needs your session key in order to access posts from the artists/creators you are subscribed to. This document details ways to get this key, which vary from browser to browser.</p>
        <p>After going to the paysite you want to import and signing in, (<a href="https://patreon.com">Patreon</a>/<a href="https://www.pixiv.net/fanbox">Fanbox</a>/<a href="https://gumroad.com/">Gumroad</a>/<a href="https://subscribestar.adult/">SubscribeStar</a>/<a href="https://play.dlsite.com/eng/#/library">DLsite English</a>/<a href="https://play.dlsite.com/#/library">DLsite Japan</a>) you need to find where cookies are located in your browser.</p>
        <h3 id="chrome">Chrome</h3>
        <ul>
          <li>Click the padlock button in the address bar.</li>
          <img src="/padlock.png" alt="Padlock Button"></li>
          <li>Go to Cookies &gt; [site] &gt; Cookies</li>
          <li>Click the cookie for your service and copy the key next to &quot;Content&quot;</li>
        </ul>
        <h3 id="safari">Safari</h3>
        <ul>
          <li>Ensure &quot;Show Develop Menu&quot; is enabled in Preferences (<code>⌘,</code>)</li>
          <li>Open Web Inspector (<code>⌘⌥I</code>)</li>
          <li>Go to Storage &gt; Cookies</li>
          <li>Right-click the cookie for your service and click &quot;Copy&quot;</li>
        </ul>
        <h3 id="firefox">Firefox</h3>
        <ul>
          <li>Open DevTools by pressing F12 and open the Storage tab</li>
          <li>Go to Cookies &gt; [site]</li>
          <li>Go to Storage &gt; Cookies</li>
          <li>Right-click the cookie for your service and click &quot;Copy&quot;</li>
        </ul>
        <p>For other browsers, please consult browser documentation on how to access stored cookies.</p>
        <p>Below are the respective cookies for the supported paysites.</p>
        <ul>
          <li>For <em>Patreon,</em> your session key is under <code>session_key</code>.</li>
          <li>For <em>Fanbox,</em> your session key is under <code>FANBOXSESSID</code>.</li>
          <li>For <em>Gumroad,</em> your session key is under <code>_gumroad_app_session</code>.</li>
          <li>For <em>SubscribeStar,</em> your session key is under <code>auth_token</code>.</li>
          <li>For <em>DLsite,</em> your session key is under <code>__DLsite_SID</code>.</li>
        </ul>
        <h2 id="discord">Discord</h2>
        <h3 id="getting-your-token">Getting your token</h3>
        <p><em>(Credit to <a href="https://cancel.fm/">Cancel/Tumult</a> for the infographic.)</em></p>
        <img src="/dicksword.png"></li>
        <p>
          Instructions on how to get the channel IDs can be found
          <a href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-">
            here.
          </a>
        </p>
      </div>
    </div>
  </div>
`);

module.exports = { tutorial };
