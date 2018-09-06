#!/usr/bin/perl
use strict;

print "beginning\n";

open(SPECIFICFILE,"<./DATA/NA12878-L1_S1.smCounter.anno.vcf") || die "cannot open the file: $!\n";

my %specificFileContent;
my @specificFileLineArr;
my ($specificRequire, $chr);
my $num = 0;
<SPECIFICFILE>;
while (<SPECIFICFILE>){
  @specificFileLineArr = split(/\t/, $_);
  if($specificFileLineArr[0] = ~/chr(\w+)/) {
    $chr = $1;
  }
  $specificRequire = $chr."_".$specificFileLineArr[1]."_".$specificFileLineArr[3]."_".$specificFileLineArr[4];
  $specificFileContent{ $specificRequire } = $_;
}
close SPECIFICFILE;

open(ALLFILE,"<./DATA/all.vcf") || die "cannot open the file: $!\n";
open(RESULT, ">result.vcf") or die "cannot open the file: $!\n";

print "handling\n";

my @allFileLineArr;
my $allRequire;
<ALLFILE>;
while (<ALLFILE>){
  @allFileLineArr = split(/\t/, $_);
  $allRequire = $allFileLineArr[0]."_".$allFileLineArr[1]."_".$allFileLineArr[3]."_".$allFileLineArr[4];
  if($specificFileContent{$allRequire}){
    $num = $num + 1;
    print RESULT "$specificFileContent{$allRequire}\n";
  }
}
close ALLFILE;
close RESULT;

print "$num\n";

print "finished\n";

