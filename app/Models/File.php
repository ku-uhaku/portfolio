<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable = [
        'file_id',
        'name',
        'type',
        'path',
        'extension',
        'parent_id',
        'content'
    ];

    public function children()
    {
        return $this->hasMany(File::class, 'parent_id', 'file_id');
    }

    public function parent()
    {
        return $this->belongsTo(File::class, 'parent_id', 'file_id');
    }
} 