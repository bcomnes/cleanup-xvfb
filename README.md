# cleanup-xvfb
Clean up any remaining xvfb processes leftover in a Github Action.

<a href="https://github.com/bcomnes/cleanup-xvfb"><img alt="GitHub Actions status" src="https://github.com/bcomnes/cleanup-xvfb/workflows/Tests/badge.svg"></a>


## Usage

### Pre-requisites
Create a workflow `.yml` file in your repositories `.github/workflows` directory. An [example workflow](#example-workflow) is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).


### Inputs

None.

### Outputs

None.

### Example workflow

```yaml
name: Example cleaning up xvfb

on: [push]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x]

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
    - run: sudo apt-get install xvfb
    - name: npm install, build, and test
      run: |
        npm i
        xvfb-run --auto-servernum npm test
      env:
        CI: true
    - name: Cleanup xvfb pidx
      uses: bcomnes/cleanup-xvfb@v1
```

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)
