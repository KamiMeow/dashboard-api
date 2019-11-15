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

  reposDAL(res) {
    return res.map(repo => ({
      ...repo,
      issues: repo.open_issues_count,
      watchers: repo.watchers_count,
      stars: repo.stargazers_count,
      name: repo.full_name,
    }));
  }
};

module.exports = token => new Github(token);
