const BaseRepos = require('./BaseRepos');

class Github extends BaseRepos {
  constructor(token) {
    super(token, {
      baseUrl: 'https://api.github.com',
      commitsUrl: 'user/commit',
      reposUrl: 'user/repos',
    });
    return this.getAllStatistic();
  }

  parseRepos(res) {
    return res.map(repo => ({
      ...repo,
      issues: repo.open_issues_count,
      watchers: repo.watchers_count,
      stars: repo.stargazers_count,
      name: repo.full_name,

      createdDate: repo.created_at,
      pushedDate: repo.pushed_at,
    }));
  }

  parseDate(dateTime) {
    const [date, time] = dateTime.split('T');
    return {
      time: time.split('Z')[0],
      date,
    }
  }
};

module.exports = token => new Github(token);
