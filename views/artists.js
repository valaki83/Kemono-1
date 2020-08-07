const { shell, header, subheader } = require('./components');
const { transliterate } = require('transliteration');

const artists = data => shell(`
  <div class="main" id="main">
    ${header({ currentPage: 'artists' })}
    ${subheader({ currentPage: 'artists' })}
    <div class="page" id="page">
      <form
        autocomplete="off"
        class="search-form"
        novalidate="novalidate"
        action="/artists"
        accept-charset="UTF-8"
        method="get"
      >
        <div>
          <label for="q">Name</label>
          <input
            type="text"
            name="q"
            id="q"
            autocomplete="off"
            value="${data.query.q || ''}"
          >
          <small class="subtitle" style="margin-left: 5px;">Leave blank to list all</small>
        </div>
        <div>
          <label for="service">Service</label>
          <select id="service" name="service">
            <option value="">All</option>
            <option value="patreon" ${data.query.service === 'patreon' ? 'selected' : ''}>Patreon</option>
            <option value="fanbox" ${data.query.service === 'fanbox' ? 'selected' : ''}>Pixiv Fanbox</option>
            <option value="gumroad" ${data.query.service === 'gumroad' ? 'selected' : ''}>Gumroad</option>
            <option value="subscribestar" ${data.query.service === 'subscribestar' ? 'selected' : ''}>SubscribeStar</option>
            <option value="discord" ${data.query.service === 'discord' ? 'selected' : ''}>Discord</option>
            <option value="dlsite" ${data.query.service === 'dlsite' ? 'selected' : ''}>DLsite</option>
          </select>
        </div>
        <div>
          <label for="sort_by">Sort by</label>
          <select id="sort_by" name="sort_by">
            <option value="_id" ${data.query.sort_by === '_id' ? 'selected' : ''}>Date Indexed</option>
            <option value="name" ${data.query.sort_by === 'name' ? 'selected' : ''}>Alphabetical Order</option>
            <option value="service" ${data.query.sort_by === 'service' ? 'selected' : ''}>Service</option>
          </select>
          <select name="order">
            <option value="asc">Ascending</option>
            <option value="desc" ${data.query.order === 'desc' ? 'selected' : ''}>Descending</option>
          </select>
        </div>
        <div>
          <label for="limit">Limit</label>
          <input
            type="text"
            name="limit"
            id="limit"
            autocomplete="off"
            value="${data.query.limit || ''}"
          >
          <small class="subtitle" style="margin-left: 5px;">Up to 250, default 50</small>
        </div>
        <input type="submit" name="commit" value="Search">
      </form>
      <table class="search-results" width="100%">
        <thead>
          <tr>
            <th width="50px">Icon</th>
            <th>Name</th>
            <th>Transliteration</th>
            <th>Service</th>
          </tr>
        </thead>
        <tbody>
          ${data.results.length === 0 ? `
            <tr>
              <td></td>
              <td class="subtitle">No artists found for your query.</td>
              <td></td>
              <td></td>
            </tr>
          ` : ''}
          ${data.results.map(artist => `
            <tr class="artist-row">
              <td>
                <div class="user-icon" data-user="${artist.id}" data-service="${artist.service}"></div>
              </td>
              <td>
                ${artist.service === 'discord' ? `
                  <a href="/discord/server/${artist.id}">${artist.name}</a>
                ` : `
                  <a href="/posts?tags=user%3A${artist.id}+service%3A${artist.service}">${artist.name}</a>
                `}
              </td>
              <td>
                <div>${transliterate(artist.name) !== artist.name ? transliterate(artist.name) : '<span class="subtitle">(N/A)</span>'}</div>
              </td>
              <td>
                ${({
                  patreon: 'Patreon',
                  fanbox: 'Pixiv Fanbox',
                  subscribestar: 'SubscribeStar',
                  gumroad: 'Gumroad',
                  discord: 'Discord',
                  dlsite: 'DLsite'
                })[artist.service]}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
  ${data.results.length !== 0 ? `
    <script src="https://unpkg.com/unfetch@4.1.0/polyfill/index.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>
    <script src="/js/artists.js"></script>
  ` : ''}
`);

module.exports = { artists };
