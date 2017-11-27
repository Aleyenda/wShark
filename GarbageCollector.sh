#!/bin/bash

for session_file in `find /home/aleyenda/WebShark/* -maxdepth 0 -iname sess_*`
do
	id=$(echo $session_file | sed 's/sess_//')"/"
	if [ -d $id ]
	then
		chown root $session_file
		chmod 660 $session_file
		expire_time=$(head -n 1 $session_file)
		expire_time=${expire_time:16}
		expire_time=${expire_time%?}
		
		time=$(date +%s)
		echo $time >> /home/aleyenda/WebShark/log.txt
		diff=$(($time-$expire_time))
		echo $diff >> /home/aleyenda/WebShark/log.txt
		
		if [ "$diff" -gt "3600" ]
		then
			rm -rf $id
			rm -f $session_file
		fi

	else
		rm -f $session_file
	fi

done
