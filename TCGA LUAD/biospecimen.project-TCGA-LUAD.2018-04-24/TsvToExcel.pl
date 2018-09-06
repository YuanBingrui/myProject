#!/usr/bin/perl -w

use strict;
# 引入生成Excel文档的模块
# 该模块在使用之前需要安装命令=> cpan Spreadsheet::WriteExcel
use Spreadsheet::WriteExcel;

# 读取tsv格式文档目录
opendir (DIR, "./tsv") or die "the dir can not open, $!";
# 循环读取tsv文档
while (my $file = readdir DIR) {
    if( $file eq "." || $file eq ".." ){
        next;
    }else{
        print "$file is handling......\n";
        # 读取tsv格式文档
        open (TABFILE, "<./tsv/$file") or die "$file can not open: $!";
        if(!(-e "excel")) {
            mkdir( "excel" ) or die "无法创建目录, $!";
        }
        # 创建excel文档
        my $workbook  = Spreadsheet::WriteExcel->new("./excel/$file.xls");
        # 创建sheet表
        my $worksheet = $workbook->add_worksheet();
        # 初始行
        my $row = 0;
        while (<TABFILE>) {
            chomp;
            # 按'\t'分割
            my @Fld = split('\t', $_);
            # 初始列
            my $col = 0;
            foreach my $token (@Fld) {
                $worksheet->write($row, $col, $token);
                $col++;
            }
            $row++;
        }
        print "$file.xls create success\n";
        close(TABFILE);
    }
}

closedir DIR;