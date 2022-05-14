# csv-file-divider

대용량 csv 파일을 여러개의 csv 파일로 분리하기 위한 툴입니다.  
csv-file-divider is a tool to divide huge single csv file into multiple smaller csv files.

# Usage

```
Usage: csv-file-divider [options] <source_path>

Arguments:
  source_path        source csv file path

Options:
  --out-name <name>  output file name. sequence will be appended (e.g. output0.csv,
                     output1.csv) (default: "output")
  --count <count>    number of rows that will be stored in same file (default: 1000)
  -h, --help         display help for command
```
